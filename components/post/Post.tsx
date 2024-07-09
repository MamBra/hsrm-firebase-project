import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Pressable, ImageStyle } from 'react-native';
import usePost from '../../utils/hooks/usePost';
import { getDatabase, ref, set, onValue } from 'firebase/database'

interface PostProps {
    id: string;
    edit: boolean;
    message: string;
    timestamp: number;
}

const db = getDatabase()

export type Post = {
    id: string,
    userId: string,
    timestamp: number,
    message: string
}

const PostComponent: React.FC<PostProps> = ({ id, message, timestamp, edit }) => {
    // const [ post, setPost, setMessage, deletePost ] = usePost(id);

    const [ messageText, setMessageText ] = useState<string>(message);
    const [ isEditing, setIsEditing ] = useState<boolean>(false);
    const [ date, setDate ] = useState<Date>(new Date(timestamp));

    const [post, setPostVal] = useState<Post>()
    const dbRef = ref(db, `posts/${id}`)

    const setPost = (post: Post) =>{
        setPostVal(post);
        set(dbRef, post)
    }

    const setMessage = (message: string) => {
        setPost({
        ...post,
        message,
        timestamp: Date.now()
        } as Post)
    }

    const deletePost = () => { 
        set(dbRef, null)
    }

    useEffect(() => {
        const unsubscribeFromValueChanged = onValue(dbRef, (snapshot) => {
            setPostVal(snapshot.val());
        })

        return unsubscribeFromValueChanged
    }, [])

    useEffect(() => {
        if(!post) return;
        setMessageText(post.message);
        setDate(new Date(post.timestamp));
    }, [post]);

    const handleEditPress = () => {
        if(isEditing) {
            // Save changes
            setMessage(messageText);
        }

        setIsEditing(!isEditing)
    }

    const handleKeyPress = (e: any) => {
        if(e.key === 'Enter') {
            setMessage(messageText);
            setIsEditing(false);
        } else if(e.key === 'Escape') {
            setMessageText(post?.message || '');
            setIsEditing(false);
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.timestamp}>{date.getDate()}.{date.getMonth()}.{date.getFullYear()} - {date.getHours()}:{(date.getMinutes() < 10 ? "0" : "") + date.getMinutes() }{isEditing && <Text> - BEARBEITEN</Text>}</Text>
            
            <View style={styles.messageContainer}>
                { isEditing ? ( 
                    <TextInput style={styles.messageInput} value={messageText} onChangeText={setMessageText} onKeyPress={(e) => handleKeyPress(e)}/>
                ) : (
                    <Text style={styles.messageText}>{messageText}</Text>
                )}


                { edit && <>
                    { isEditing ? (
                        <Pressable onPress={handleEditPress}>
                            <Text>&#x2713;</Text>
                        </Pressable>
                    ) : (
                        <Pressable  onPress={handleEditPress}>
                            <Image style={styles.editButton as ImageStyle} source={require("../../assets/img/icons/pencil_icon.png")}/>
                        </Pressable>
                    )}
                    <Pressable  onPress={deletePost}>
                        <Image style={styles.editButton as ImageStyle} source={require("../../assets/img/icons/trash_icon.png")}/>
                    </Pressable>
                    </>
                }
            </View>
        </View>
    );
};

export default PostComponent;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
    },
    timestamp: {
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        marginTop: 10,
    },
    messageText: {
        width: '80%',
        height: 50,
    },
    messageInput: {
        width: '80%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
    },
    editButton: {
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        borderWidth: 1,
        width: 20,
        height: 20,
    },
});