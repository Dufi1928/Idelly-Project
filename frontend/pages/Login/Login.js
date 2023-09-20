import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginStyles from './LoginStyles';
import SignupStyles from "../SignUp/SignupStyles";

const getFonts = () => Font.loadAsync({
    'Quicksand-Bold': require('../../src/fonts/Quicksand-Bold.ttf'),
});

export default function Signup({ navigation }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        console.log(email)
        console.log(password)
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
                <Text style={LoginStyles.textHeader}> Connection</Text>
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
                
                <Button title="Me connecter"
                        titleStyle={{ fontFamily: 'Quicksand-Bold', fontSize: 20 }}
                        buttonStyle={LoginStyles.button}
                        onPress={handleSignup} />
                <Text
                    style={SignupStyles.redirectText}
                    onPress={() => navigation.navigate('Signup')}>
                    Creer un compte !
                </Text>
            </LinearGradient>
        );
    } else {
        return <View style={LoginStyles.container} />;
    }
}


