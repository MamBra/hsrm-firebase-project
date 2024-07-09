import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useAuthentication from '../utils/hooks/useAuthentication';
import '../config/firebase';

import NewPost from '../components/post/NewPost';
import PostsComponent from '../components/post/Posts';

const auth = getAuth();

const HomeScreen: React.FC = () => {
    const { user } = useAuthentication();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            window.location.pathname = "/"
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>New Twitter!</Text>
                <Button title="Sign out" onPress={handleSignOut} />
            </View>
            <NewPost />
            <PostsComponent />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        gap: 10,
        width: '100%',
        backgroundColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default HomeScreen;