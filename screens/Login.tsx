import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button, Pressable, ActivityIndicator  } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../config/firebase';

const auth = getAuth();

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (email: string) => setEmail(email);

    const handlePasswordChange = (password: string) => setPassword(password);

    const handleSubmit = () => {
        setLoading(true);
        setError('');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: any) => {
                // Signed in
                const user = userCredential.user;
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error:', errorCode, errorMessage);
                setError("Wrong Email or Password");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleKeyPress = (event: any) => {
        if (event.keyCode === 13) {
            handleSubmit();
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.loginHeader}>Login</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    id="loginEmailInput"
                    value={email}
                    onChangeText={handleEmailChange}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    id="loginPasswordInput"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                />
                <Text>Don't remember you're Password? <Pressable onPress={() => window.location.pathname = "/resetpassword"}><Text style={styles.link}>Reset</Text></Pressable></Text>
                <Text style={styles.error}>{error}</Text>
                { loading ? <ActivityIndicator color="#0000ff" /> : <Button title="Login" onPress={handleSubmit} />}
                <Text>Don't have an account? <Pressable onPress={() => window.location.pathname = "/register"}><Text style={styles.link}>Register</Text></Pressable></Text>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
    },
    loginHeader: {
        textAlign: 'center',
        fontSize: 35,
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
    },
    input: {
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    link: {
        color: 'blue',
    }
  });