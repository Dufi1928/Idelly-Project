import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    }
});

export default LoginStyles;
