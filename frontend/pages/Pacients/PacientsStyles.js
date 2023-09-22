import { StyleSheet } from 'react-native';

const PacientsStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
    },
    innerBox:{
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    icon:{
        color: 'white',
        marginLeft: 10
    },

    addButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#231C4D', // couleur de votre choix
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    addButtonText: {
        color: 'white',
        fontWeight: "bold",
        marginLeft: 5, // espace entre l'icône et le texte
        marginRight: 25 // espace entre l'icône et le texte
    },
    addButtonIcon:{
        marginLeft: 15,
    },
    innerBoxInput:{
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        color: 'white',
        borderWidth: 0
    },
    clientsListWrapper:{
        paddingTop: 10,
    },
    clientsListBox:{
        backgroundColor: '#662483',
        padding: 10,
        height: 50,
        marginTop: 5,
        borderRadius: 7

    },
    clientsListInner:{
        flex: 1,
        height: 20,
        fontWeight:"bold",
        paddingHorizontal: 10,
        color: 'white',
        borderWidth: 0
    },
});

export default PacientsStyles;
