import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeStyles from './HomeStyles';


const getFonts = () => Font.loadAsync({
    'Quicksand-Bold': require('../../src/fonts/Quicksand-Bold.ttf'),
});

export default function Home({ navigation }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const checkUserToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            const storedUserDataStr = await AsyncStorage.getItem('userData');
            console.log(token)
            if (!token) {
                navigation.navigate('LoginTab', { screen: 'LoginStack', params: { screen: 'Login' } });
                return;
            }

            try {
                const parsedStoredUserData = JSON.parse(storedUserDataStr);
                setUserData(parsedStoredUserData);
            } catch(parseError) {
                console.error("Error parsing stored user data:", parseError);
            }
        };

        SplashScreen.preventAutoHideAsync()
            .then(getFonts)
            .then(() => setFontsLoaded(true))
            .then(checkUserToken)
            .catch(console.warn)
            .finally(() => SplashScreen.hideAsync());
    }, [navigation]);

    
    const handleSignout = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage has been cleared!');
            navigation.navigate('LoginTab', { screen: 'LoginStack' });
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    }


    if (fontsLoaded) {
        return ( 
            <LinearGradient
                colors={['#E6007E', '#662483']}
                style={HomeStyles.container}
            >
                <Text style={HomeStyles.textHeader}> Home</Text>

                <Text
                    style={HomeStyles.redirectText}
                    onPress={handleSignout}>
                    Me deconnecter
                </Text>
            </LinearGradient>
        );
    } else {
        return <View style={HomeStyles.container} />;
    }
}
