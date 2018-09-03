import { StyleSheet } from 'react-native';

export default Estilo = StyleSheet.create({
    Pantalla: {
        width: '100%',
        height: '100%'
    },
    Content: {
        flex: 1,
    },
    CenterFlex: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Color: {
        color: 'violet'
    },
    Color1: {
        color: 'white'
    },
    Backgroud: {
        backgroundColor: 'violet'
    },
    Imagen: {
        width: '90%',
        height: '90%',
        flex: 1
    },
    Espaciado: {
        justifyContent: 'space-evenly'
    },
    Espaciado1: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        flex: 1
    },
    Boton: {
        backgroundColor: 'violet'
    },
    Start: {
        alignItems: 'flex-start'
    },
    End: {
        alignItems: 'flex-end'
    },
    Card: {
        borderRadius: 10,
        borderColor: '#800080',
        backgroundColor: '#800080',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    Item: {
        borderRadius: 10,
        borderColor: '#800080',
        backgroundColor: '#800080',
    },
    Body: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    }
});