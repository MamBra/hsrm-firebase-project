import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button, Linking, Pressable  } from 'react-native';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import '../config/firebase';

const auth = getAuth();

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); 
    const [successText, setSuccessText] = useState(''); 

    const handleEmailChange = (email: string) => setEmail(email);

    const handleSubmit = () => {
        setError('');
        setSuccessText('');
        const actionCodeSettings = {
            url: 'https://hsrm-firebase-project.web.app',
            handleCodeInApp: true
          };
          console.log(actionCodeSettings)

        sendPasswordResetEmail(auth, email, actionCodeSettings)
            .then(() => {
                setSuccessText("Check your Emails :)")
            }) 
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error:', errorCode, errorMessage);
                setError("Password reset failed. Email not found.")
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
                <Text style={styles.loginHeader}>Reset Password</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    id="resetPasswordEmailInput"
                    value={email}
                    onChangeText={handleEmailChange}
                    onKeyPress={handleKeyPress}
                />
                <Text style={styles.error}>{error}</Text>
                <Text style={styles.success}>{successText}</Text>
                <Button title="Reset Password" onPress={handleSubmit} />
                <Text>Remember you're Password? <Pressable onPress={() => window.location.pathname = "/"}><Text style={styles.link}>Login</Text></Pressable></Text>
            </View>
        </View>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80
    },
    loginForm: {
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
    error: {
        color: 'green',
        marginBottom: 10,
    },
    link: {
        color: 'blue',
    }
  });