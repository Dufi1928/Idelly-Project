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

    const handleLogin = async () => {
        const userData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('https://mygameon.pro:9501/api/login', userData);

            if (response && response.data) {
                if (response.status === 200) {
                    await AsyncStorage.setItem('userToken', response.data.jwt);
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    navigation.navigate('MainTabs', { screen: 'HomeTab', params: { screen: 'Home' } });
                } else if (response.data.error) {
                    Alert.alert(
                        'Erreur',
                        JSON.stringify(response.data.error),
                        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                        {cancelable: false},
                    );
                }
            } else {
                console.error("Response is invalid or missing data field.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                Alert.alert(
                    'Erreur',
                    JSON.stringify(error.response.data.error),
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                );
            } else {
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
                style={LoginStyles.container}
            >
                <Image source={require('../../assets/Logo/logo.png')} style={LoginStyles.logo} />

                <Input
                    inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 13, borderRadius: 10, backgroundColor: 'white' }}
                    leftIconContainerStyle={{ marginRight: 20 }}
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope',color: '#662483' }}
                    onChangeText={value => setEmail(value.toLowerCase())}
                />
                <Input
                    inputContainerStyle={{ borderBottomWidth: 0, paddingLeft: 13, borderRadius: 10, backgroundColor: 'white' }}
                    leftIconContainerStyle={{ marginRight: 20 }}
                    placeholder="Mot de passe"
                    leftIcon={{ type: 'font-awesome', name: 'lock',color: '#662483' }}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true}
                />

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


