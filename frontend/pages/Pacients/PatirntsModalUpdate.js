import  React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientModalUpdate = ({ isVisible, closeModal, Patient, navigation  }) => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date(1598051730000));
    const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [address, setAddress] = useState("");
    const [additional_info, setAdditional_info] = useState("");
    const [treating_doctor, setTreating_doctor] = useState("");
    const [pharmacy, setPharmacy] = useState("");
    const [other_contact, setOther_contact] = useState("");
    const [gender, setGender] = useState(null);
    const [patientId, setPatientId] = useState(null);
    const [token, setToken] = useState(null);
    const [showPicker, setShowPicker] = useState(false);


    const getToken = async () => {
        const myToken = await AsyncStorage.getItem('userToken');
        setToken(myToken);
    };


    useEffect(() => {
        getToken();
        if (Patient!=null){
            setPatientId(Patient.id);
            setName(Patient.name);
            setSurname(Patient.surname);
            setGender(Patient.gender);
            setPhone_number(Patient.phone_number);
            const dob = new Date(Patient.date_of_birth); // Convertir la date de naissance en un objet Date
            setDateOfBirth(dob);
            setSocialSecurityNumber(Patient.social_security_number);
            setAddress(Patient.address);
            setAdditional_info(Patient.additional_info);
            setTreating_doctor(Patient.treating_doctor);
            setPharmacy(Patient.pharmacy);
            setOther_contact(Patient.other_contact);
        }

    }, [Patient]);


    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    }
    const sendPatient = async () => {
        const userData = {
            token : token,
            name: name,
            patient_id: patientId,
            surname: surname,
            socialSecurityNumber: socialSecurityNumber,
            phone_number: phone_number,
            gender: gender,
            address: address,
            date_of_birth: formatDate(dateOfBirth),
            additional_info: additional_info,
            treating_doctor: treating_doctor,
            pharmacy: pharmacy,
            other_contact: other_contact,
        };
        try {
            const response = await axios.post('https://mygameon.pro:9501/api/modify_patient', userData);
            if (response && response.data) {
                if (response.status !== 200 && response.data.error) {
                }
                if (response.status === 201 || response.status === 200) {
                    console.log("Good");
                    closeModal();
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



    }

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setDateOfBirth(currentDate);
        }
        setShowPicker(false);
    };
    const showDatepicker = () => {
        // setDateOfBirth(new Date(1598051730000));
        setShowPicker(true);
    };
    const resetForm = () => {
        setName("");
        setSurname("");
        setDateOfBirth("");
        setSocialSecurityNumber("");
        setPhone_number("");
        setAddress("");
        setAdditional_info("");
        setTreating_doctor("");
        setPharmacy("");
        setOther_contact("");
        setGender(null);
    };


    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={closeModal}
        >

            {/* // ################################## Le bondeau du haut START  */}
            <View style={styles.ModalClose} >
                <Text style={styles.NewPatient}>Modifier le  patient
                </Text>
                <TouchableOpacity
                    style={styles.CloseButton}
                    onPress={() => {
                        closeModal();
                        resetForm();
                    }}
                >
                    <Icon style={styles.CloseButton} name="times" size={30} color="#E6007E" />
                </TouchableOpacity>
            </View>
            {/* // ################################## Le bondeau du haut END  */}

            <View style={styles.ModalContainer}>
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.Label}>Nom/prénom :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nom"
                                onChangeText={setName}
                                value={name}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Prénom"
                                onChangeText={setSurname}
                                value={surname}
                            />
                        </View>
                        <Text style={styles.Label}>Genre :</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.genderContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.genderButton,
                                        gender === 'male' && styles.selectedGender
                                    ]}
                                    onPress={() => setGender('male')}
                                >
                                    <Text style={gender === 'male' ? styles.selectedGenderText : styles.genderText}>Masculin</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.genderButton,
                                        gender === 'female' && styles.selectedGender
                                    ]}
                                    onPress={() => setGender('female')}
                                >
                                    <Text style={gender === 'female' ? styles.selectedGenderText : styles.genderText}>Feminin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.Label}>Date de naissance :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLarge}
                                placeholder="Sélectionner la date"
                                value={dateOfBirth ? dateOfBirth.toLocaleDateString() : ""}
                                onPressIn={showDatepicker}
                            />
                            {showPicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dateOfBirth}
                                    mode="date"
                                    is24Hour={true}
                                    onChange={onChange}
                                />
                            )}
                        </View>
                        <Text style={styles.Label}>Numéro de sécurité sociale :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                keyboardType="numeric"
                                style={styles.inputLarge}
                                placeholder="Numéro de sécurité sociale"
                                onChangeText={setSocialSecurityNumber}
                                value={socialSecurityNumber}
                            />
                        </View>
                        <Text style={styles.Label}>Numero de telephone :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                keyboardType="numeric"
                                style={styles.inputLarge}
                                placeholder="Numero de telephone"
                                onChangeText={setPhone_number}
                                value={phone_number}
                            />
                        </View>
                        <Text style={styles.Label}>Adresse :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLarge}
                                placeholder="Adresse"
                                onChangeText={setAddress}
                                value={address}
                            />
                        </View>
                        <Text style={styles.Label}>Information supplémentaire :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                multiline = {true}
                                numberOfLines={5}
                                style={styles.inputLargeMultilines}
                                placeholder="Information supplémentaire"
                                onChangeText={setAdditional_info}
                                value={additional_info}
                            />
                        </View>
                        <Text style={styles.Label}>Medecin traitant :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLarge}
                                placeholder="Medecin traitant"
                                onChangeText={setTreating_doctor}
                                value={treating_doctor}
                            />
                        </View>
                        <Text style={styles.Label}>Pharmacie :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLarge}
                                placeholder="Pharmacie"
                                onChangeText={setPharmacy}
                                value={pharmacy}
                            />
                        </View>
                        <Text style={styles.Label}>Contact divers :</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputLarge}
                                placeholder="Contact divers"
                                onChangeText={setOther_contact}
                                value={other_contact}
                            />
                        </View>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.addButton} onPress={sendPatient}>
                                <Text style={styles.addButtonText}>Modifier </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    // ################################## Le style ddu bondeau du haut
    ModalClose:{
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: '#f4f4f5'
    },
    CloseButton:{
        display:'flex'
    },
    NewPatient:{
        fontSize: 20,
        fontWeight: 'bold',
        display: 'flex',
    },
    // ##################################
    inputContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topPage:{
        display: "flex",
        width: '100%'

    },

    Label:{
        width:'96%',
        padding: 'none',
        margin: 'none',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        height: 40,
        width: '46%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
    },
    inputLarge: {
        height: 40,
        width: '94%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 3,
        padding: 10,
    },
    inputLargeMultilines: {
        width: '94%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 3,
        padding: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        width: '94%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    genderButton: {
        width: '48%',
        height: 40,
        display: 'flex',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ccc',
        backgroundColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    selectedGender: {
        backgroundColor: '#E6007E',
        color: 'white',
    },
    genderText: {
        fontSize: 16,
    },
    selectedGenderText:{
        fontSize: 16,
        color: 'white'
    },
    ModalContainer:{
        // paddingTop: 26,
        flex: 1,
        backgroundColor: '#f4f4f5'
    },
    pickerButton:{
        backgroundColor: '#E6007E',
        color: 'white',
        borderRadius: 5,
        padding: 5,
    },
    addButtonText: {
        color: 'white',
        textAlign: "center",
        fontWeight: "bold",
    },
    addButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#231C4D',
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },

});

export default PatientModalUpdate;
