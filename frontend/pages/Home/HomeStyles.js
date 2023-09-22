import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
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
    },
    redirectText: {
        marginTop: 15,
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
    
});

export default HomeStyles;
