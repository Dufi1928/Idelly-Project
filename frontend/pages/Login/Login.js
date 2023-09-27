import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image  } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Easing, Animated, Alert } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginStyles from './LoginStyles';
import SignupStyles from "../SignUp/SignupStyles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getFonts = () => Font.loadAsync({
    'Quicksand-Bold': require('../../src/fonts/Quicksand-Bold.ttf'),
});

export default function Login({ navigation }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [apiError, setApiError] = useState('');



    const handleLogin = async () => {
        const userData = {
            email: email,
            password: password,
        };

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Veuillez entrer un email valide.');
            return;
        } else {
            setEmailError(''); // réinitialiser le message d'erreur si l'email est valide
        }

        // Validation du mot de passe
        if (password.length < 4) {
            setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        } else {
            setPasswordError(''); // réinitialiser le message d'erreur si le mot de passe est valide
        }

        try {
            const response = await axios.post('https://mygameon.pro:9501/api/login', userData);
            if (response && response.data) {
                if (response.status === 200) {
                    await AsyncStorage.setItem('userToken', response.data.jwt);
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    navigation.navigate('MainTabs', { screen: 'HomeTab', params: { screen: 'Home' } });
                } else if (response.status === 401) {
                    setApiError('L\'email ou le mot de passe sont incorrects.');
                } else if (response.data.error) {
                    setApiError(JSON.stringify(response.data.error));
                }
            } else {
                setApiError("La réponse est invalide ou le champ de données est manquant.");
            }
        } catch (error) {
            //  vérification si le code d'état de l'erreur est 401
            if (error.response && error.response.status === 401) {
                setApiError('L\'email ou le mot de passe sont incorrects.');
            } else {
                let errorMessage = error.message;
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage = JSON.stringify(error.response.data.error);
                }
                setApiError(errorMessage);
            }
        }}


    useEffect(() => {
        SplashScreen.preventAutoHideAsync()
            .then(getFonts)
            .then(() => setFontsLoaded(true))
            .catch(console.warn)
            .finally(() => SplashScreen.hideAsync());
    }, []);


    useEffect(() => {
        setApiError('');
    }, [email,password]);

    if (fontsLoaded) {
        return (
            <LinearGradient
                colors={['#E6007E', '#662483']}
                style={LoginStyles.container}
            >
                <Image source={require('../../assets/Logo/logo.png')} style={LoginStyles.logo} />

                <Input
                    inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 13, borderRadius: 10, backgroundColor: 'white' }}
                    leftIconContainerStyle={{ marginRight: 20 }}
                    placeholder="Email"
                    errorMessage={emailError}
                    errorStyle={{ color: '#EF9A9A' }}
                    leftIcon={{ type: 'font-awesome', name: 'envelope',color: '#662483' }}
                    onChangeText={value => setEmail(value.toLowerCase())}
                />
                <Input
                    inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 13, borderRadius: 10, backgroundColor: 'white' }}
                    leftIconContainerStyle={{ marginRight: 20 }}
                    placeholder="Mot de passe"
                    errorMessage={passwordError}
                    errorStyle={{ color: '#E57373' }}
                    leftIcon={{ type: 'font-awesome', name: 'lock',color: '#662483' }}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true}
                />
                {apiError && <Text style={LoginStyles.error}>{apiError}</Text>}
                <Button title="Se connecter"
                        titleStyle={{ fontFamily: 'Quicksand-Bold', fontSize: 20 }}
                        buttonStyle={LoginStyles.button}
                        onPress={handleLogin} />
                <Text
                    style={SignupStyles.redirectText}
                    onPress={() => navigation.navigate('Signup', { screen: 'SignupStack' })}>
                    Créer un compte
                </Text>
            </LinearGradient>
        );
    } else {
        return <View style={LoginStyles.container} />;
    }
}


