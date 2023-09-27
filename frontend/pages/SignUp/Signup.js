import React, { useState, useEffect } from 'react';
import { View,Image, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Alert } from 'react-native';
import SignupStyles from './SignupStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        if (password !== confirmPassword) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas!");
            return;
        }

        const userData = {
            email: email,
            password: password,
            firstName: name,
            lastName: surname
        };

        try {
            const response = await axios.post('https://mygameon.pro:9501/api/Register', userData);

            if (response && response.data) {
                if (response.status !== 200 && response.data.error) {
                    Alert.alert("Erreur", response.data.error);
                } else if (response.status === 200) {
                    await AsyncStorage.setItem('userToken', response.data.jwt);
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    navigation.navigate('MainTabs', { screen: 'HomeTab', params: { screen: 'Home' } });
                }
            } else {
                Alert.alert("Erreur", "La réponse est invalide ou le champ de données est manquant.");
            }
        } catch (error) {
            let errorMessage = error.message;
            if (error.response && error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            Alert.alert("Erreur", errorMessage);
        }
    }

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
                <Image source={require('../../assets/Logo/logo.png')} style={SignupStyles.logo} />

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
                    onPress={() => navigation.navigate('LoginTab', { screen: 'LoginStack' })}>
                    Vous avez un compte ? Connectez-vous
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


