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
        // First, check if password and confirmPassword match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
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
                    console.log(response.data.error);
                } else if (response.status === 200) {
                    // Sauvegardez les données dans le stockage local
                    await AsyncStorage.setItem('userToken', response.data.jwt);
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    navigation.navigate('MainTabs', { screen: 'HomeTab', params: { screen: 'Home' } });
                    
                }
            } else {
                console.error("Response is invalid or missing data field.");
            }
        } catch (error) {

            console.error("Error details:", error.response.data.error);
            if (error.response) {
                console.error("Error details:", error.response.data.error);
                Alert.alert(
                    'Erreur', 
                    JSON.stringify(error.response.data.error),
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                );
            } else {
                console.error("Error:", error.message);
                Alert.alert(
                    'Erreur', 
                    error.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                );
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


