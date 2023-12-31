import { StyleSheet } from 'react-native';

const SignupStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    button:{
        backgroundColor: '#E6007E',
        padding: 10,
    },
    input:{
        color: 'white'
    },
    textHeader:{
        fontSize: 30,
        width: '100%',
        fontFamily: 'Quicksand-Bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    redirectText: {
        marginTop: 15,
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    logo: {
        marginBottom: 30,
        width: 200,      
        height: 100,     
        resizeMode: 'contain', 
    }
});

export default SignupStyles;
