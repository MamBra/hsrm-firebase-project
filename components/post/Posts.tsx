import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onChildAdded, onChildRemoved, get, set, query, orderByChild } from 'firebase/database'
import { Post } from '../../utils/hooks/usePost';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PostComponent from './Post';
import { getAuth } from 'firebase/auth';

const db = getDatabase()
const dbRef = ref(db, `/posts`);

const query_ref = query(dbRef, orderByChild('timestamp'))


const PostsComponent: React.FC = () => {
    const [posts, setPosts] = useState<Array<Post>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {

        // 
        const handleChildAdded = onChildAdded(dbRef, (data) => {
            setIsLoading(true);
            const postData = data.val()
            setPosts((prevPosts) => [{...postData, id: data.key || ''}, ...prevPosts]);
            setIsLoading(false);
        });

        const handleChildRemoved = onChildRemoved(dbRef, (data) => {
            setIsLoading(true);
            const postId = data.key;
            setPosts((prevPosts) => prevPosts.filter(post => post.id != postId));
            setIsLoading(false);
        });

        // Cleanup
        return () => {
            onChildAdded(dbRef, () => {});
            onChildRemoved(dbRef, () => {});   
        }

    }, []);

    let userId = getAuth().currentUser?.uid;
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Posts</Text>
            { isLoading ? <Text>Loading...</Text> : (
                <FlatList
                    style={styles.postsContainer}
                        data={posts}
                        renderItem={({ item }) => 
                            <PostComponent 
                                key={item.id} 
                                id={item.id} 
                                message={item.message} 
                                timestamp={item.timestamp} 
                                edit={userId == item.userId} />}
                        keyExtractor={item => item.id}/>

                )
            }
        </View>
    );
};

export default PostsComponent;

const styles = StyleSheet.create({
    container: {
        width: '80%',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    postsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: 800,
    },
});