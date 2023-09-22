import React, { useState, useEffect } from 'react';
import {View, Button, Modal, TouchableOpacity, TextInput, FlatList, Alert} from 'react-native';
import { Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import PacientsStyles from './PacientsStyles';
import PatientModal from './PatientModal';
import { SwipeListView } from 'react-native-swipe-list-view';
import axios from "axios";

const getFonts = () => Font.loadAsync({
    'Quicksand-Bold': require('../../src/fonts/Quicksand-Bold.ttf'),
});

export default function Pacients({ navigation }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [userData, setUserData] = useState(null);
    const [patients, setPatients] = useState([]);
    const [token, setToken] = useState(null);
    const [update, setUpdate] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const filteredPatients = patients.filter(patient => {
        const patientName = `${patient.name} ${patient.surname}`.toLowerCase();
        return patientName.includes(searchQuery.toLowerCase());
    });


    useEffect(() => {
        const checkUserToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            const storedUserDataStr = await AsyncStorage.getItem('userData');
            if (!token) {
                navigation.navigate('LoginTab', { screen: 'LoginStack', params: { screen: 'Login' } });
                return;
            }else{
                setToken(token);
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


    const removePatients = async (patientId) => {
        const dataToSend = {
            token: token,
            patient_id: patientId,
        }
        try {
            const response = await axios.post('https://mygameon.pro:9501/api/delete_patient', dataToSend);

            if (response && response.data) {
                if (response.status === 200 || response.status === 201) {
                    if (update == true){
                        setUpdate(false)
                    }else{
                        setUpdate(true)
                    }

                }
            } else {
                console.error("Response is invalid or missing data field.");
            }
        }catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                console.log(error.response.data.error)
            }
        }
    }

    useEffect(()=>{

        const handlPatients = async () => {
            const dataToSend = {
                token: token,
            };
            try {
                const response = await axios.post('https://mygameon.pro:9501/api/Patients', dataToSend);
                if (response && response.data) {
                    if (response && response.data && response.status === 200) {
                        setPatients(response.data);
                    }
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    console.log(error)
                } else {
                    console.log(error)
                }
            }
        };
        handlPatients()
    },[token, navigation,update]);

    const handleSignout = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage has been cleared!');
            navigation.navigate('LoginTab', { screen: 'LoginStack', params: { screen: 'Login' } });
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    }


    if (fontsLoaded) {
        return (
            <LinearGradient
                colors={['#E6007E', '#662483']}
                style={PacientsStyles.container}
            >
                <View style={PacientsStyles.innerBox} >
                    <Icon style={PacientsStyles.icon} name="search" size={20} color="white"/>
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Rechercher un patient..."
                        placeholderTextColor="white"
                        style={PacientsStyles.innerBoxInput}
                    />
                </View>
                <TouchableOpacity style={PacientsStyles.addButton} onPress={() => setModalVisible(true)}>
                    <Text style={PacientsStyles.addButtonText}>Ajouter un patient</Text>
                    <Icon style={PacientsStyles.addButtonIcon} name="plus" size={20} color="white" />
                </TouchableOpacity>
                <SwipeListView
                    data={filteredPatients}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={PacientsStyles.clientsListBox}>
                            <Text style={PacientsStyles.clientsListInner}>{item.name} {item.surname}</Text>
                        </View>
                    )}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center',justifyContent: 'flex-end'}}>
                            <TouchableOpacity
                                style={{flexDirection: 'row', backgroundColor: '#231C4D', borderRadius: 12, justifyContent: 'flex-end',  alignItems: 'center', paddingVertical: 8, paddingRight:12, height: 50, width: '100%'}}
                                onPress={() => removePatients(data.item.id)}
                            >
                                <Icon name="trash" size={30} color="#E6007E" />
                            </TouchableOpacity>
                        </View>
                    )}
                    rightOpenValue={-75}
                    disableRightSwipe={true}
                />
                <PatientModal isVisible={isModalVisible} closeModal={() => setModalVisible(false)} />
            </LinearGradient>


        );
    } else {
        return <View style={PacientsStyles.container} />;
    }
}
