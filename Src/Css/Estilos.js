import { StyleSheet, Dimensions } from 'react-native';

export default Estilo = StyleSheet.create({
    Pantalla: {
        width: '100%',
        height: '100%'
    },
    Modal: {
        width: Dimensions.get('window').width - 130,
        height: 160,
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
    Color2: {
        color: 'red'
    },
    Backgroud: {
        backgroundColor: 'violet'
    },
    Imagen: {
        width: '90%',
        height: '90%',
        flex: 1
    },
    ImagenPerfil: {
        width: 126,
        height: 256,
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