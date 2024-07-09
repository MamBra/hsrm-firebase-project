import React, { useEffect, useState } from 'react'
import '../../config/firebase'
import { getDatabase, push, ref, serverTimestamp, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import { Button, View, Text, ButtonProps, TextInput, StyleSheet } from 'react-native'

const db = getDatabase()
const auth = getAuth()

const NewPost: React.FC = () => {
    const [postText, setPostText] = useState('')


    const handleAddPost = () => {
        // Add post to Firebase database
        const dbRef = ref(db, 'posts/')
        
        set(push(dbRef), {
            userId: auth.currentUser?.uid,
            message: postText,
            timestamp: serverTimestamp(),
        })
        .catch((error) => {
            console.error('Error writing document: ', error)
        })
        setPostText('')
    };

    const handleOnKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleAddPost()
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Post text: </Text>
            <TextInput
                style={styles.input}
                value={postText}
                onChangeText={(e: string) => setPostText(e)}
                onKeyPress={(e) => handleOnKeyPress(e)}
            />
            <Button title="Add Post" onPress={() => handleAddPost()} />
        </View>
    );
};

export default NewPost;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "middle",
        padding: 20,
    },
    label: {
        fontSize: 20,
    },
    input: {
        width: "80%",
        height: 44,
        padding: 0,
        borderWidth: 1,
        borderColor: 'black',
    },
    addButton: {
    }
})