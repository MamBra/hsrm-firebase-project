import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button, Pressable  } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import '../config/firebase';

const auth = getAuth();

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (email: string) => setEmail(email);

    const handlePasswordChange = (password: string) => setPassword(password);
    const handlePasswordRepeatChange = (passwordRepeat: string) => setPasswordRepeat(passwordRepeat);

    const handleSubmit = () => {
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error:', errorCode, errorMessage);
            setError("Registration failed. Email already in use or password is too weak.");
        });
    }

    

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.loginHeader}>Register</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    id="registerEmailInput"
                    value={email}
                    onChangeText={handleEmailChange}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    id="registerPasswordInput"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={handlePasswordChange}
                />
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    id="registerPasswordRepeatInput"
                    secureTextEntry={true}
                    value={passwordRepeat}
                    onChangeText={handlePasswordRepeatChange}
                />
                <Text style={styles.error}>{error}</Text>
                <Button title="Register" onPress={handleSubmit} />
                <Text>Already have an account? <Pressable onPress={() => window.location.pathname = "/"}><Text style={styles.link}>Login</Text></Pressable></Text>
            </View>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80
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