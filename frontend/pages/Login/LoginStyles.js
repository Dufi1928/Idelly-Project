import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center', 
        alignItems: 'center',
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
    logo: {
        marginBottom: 30,
        width: 200,      
        height: 100,     
        resizeMode: 'contain', 
    }
});

export default LoginStyles;
