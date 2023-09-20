import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Alert } from 'react-native';
import SignupStyles from './SignupStyles';
import axios from 'axios';

const getFonts = () => Font.loadAsync({
    'Quicksand-Bold': require('../../src/fonts/Quicksand-Bold.ttf'),
});

export default function Signup({ navigation }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const handleSignup = async () => {
        // First, check if password and confirmPassword match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Define the data to be sent to the backend
        const userData = {
            email: email,
            password: password,
            firstName: name,
            lastName: surname
        };

        try {
            const response = await axios.post('https://mygameon.pro:9501/api/Register', userData);

            if (response.status !== 200 && response.data.error) {
                console.log(response.data.error)
            } else if (response.status === 200) {
                 Alert.alert(
                    'Hello World', // Titre de l'alerte
                    'Hello world', // Message de l'alerte
                    [
                        {text: 'OK', onPress: () => console.log('OK')},
                    ],
                    {cancelable: false}, // Si vous voulez que l'utilisateur puisse appuyer en dehors de l'alerte pour la fermer
                );
                // Here you can also navigate to another screen after a successful registration
                // For example: navigation.navigate('YourNextScreen');
            }
        } catch (error) {

            console.error("Error details:", error.response.data.error);
            if (error.response) {
                Alert.alert(
                    'Erreur', // Titre de l'alerte
                    JSON.stringify(error.response.data.error), // Message de l'alerte
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}, // Si vous voulez que l'utilisateur puisse appuyer en dehors de l'alerte pour la fermer
                );
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
            }
        }
    };

    useEffect(() => {
        SplashScreen.preventAutoHideAsync()
            .then(getFonts)
            .then(() => setFontsLoaded(true))
            .catch(console.warn)
            .finally(() => SplashScreen.hideAsync());
    }, []);

    if (fontsLoaded) {
        return (
            <LinearGradient
                colors={['#E6007E', '#662483']}
                style={SignupStyles.container}
            >
                <Text style={SignupStyles.textHeader}> Iscription</Text>
                <Input
                    inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 13, borderRadius: 10, backgroundColor: 'white' }}
                    leftIconContainerStyle={{ marginRight: 20 }}
                    placeholder="Nom"
                    leftIcon={{ type: 'font-awesome', name: 'user',color: '#662483' }}
                    onChangeText={value => setName(value)}
                />
                <Input
                    inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 13, borderRadius: 10, backgroundColor: 'white' }}
                    leftIconContainerStyle={{ marginRight: 20 }}
                    placeholder="Prenom"
                    leftIcon={{ type: 'font-awesome', name: 'user',color: '#662483' }}
                    onChangeText={value => setSurname(value)}
                />
                <Input
                    inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 13, borderRadius: 10, backgroundColor: 'white' }}
                    leftIconContainerStyle={{ marginRight: 20 }}
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope',color: '#662483' }}
                    onChangeText={value => setEmail(value)}
                />
                <Input
                    inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 13, borderRadius: 10, backgroundColor: 'white' }}
                    leftIconContainerStyle={{ marginRight: 20 }}
                    placeholder="Mot de passe"
                    leftIcon={{ type: 'font-awesome', name: 'lock',color: '#662483' }}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true}
                />
                <Input
                    inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 13, borderRadius: 10, backgroundColor: 'white' }}
                    leftIconContainerStyle={{ marginRight: 20,  }}
                    placeholder="Confirmer le mot de passe"
                    leftIcon={{ type: 'font-awesome', name: 'lock',color: '#662483' }}
                    onChangeText={value => setConfirmPassword(value)}
                    secureTextEntry={true}
                />
                <Button title="Inscription"
                        titleStyle={{ fontFamily: 'Quicksand-Bold', fontSize: 20 }}
                        buttonStyle={SignupStyles.button}
                        onPress={handleSignup} />
                <Text
                    style={SignupStyles.redirectText}
                    onPress={() => navigation.navigate('Login')}>
                    Déjà un compte? Connectez-vous!
                </Text>

            </LinearGradient>
        );
    } else {
        return <LinearGradient
            colors={['#E6007E', '#662483']}
            style={SignupStyles.container}
        >
        </LinearGradient>;
    }
}


