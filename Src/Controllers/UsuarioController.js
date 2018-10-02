import { ImagePicker } from 'expo';
import Rutas from './Rutas';
import { AsyncStorage } from 'react-native';
import CryptoJs from 'crypto-js';

export async function setDatos(Data, Key) {
    return await AsyncStorage.setItem(Key, CryptoJs.AES.encrypt(JSON.stringify(Data), Rutas.KeyEncriptar).toString());
}

export async function getDatos(Key) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(Key).then(User => {
            var bytes = CryptoJs.AES.decrypt(User, Rutas.KeyEncriptar);
            var decryptedData = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
            resolve(decryptedData);
        }).catch(err => {
            reject();
        })
    })
}

export async function RegistrarUser(Usuario) {
    return Peticiones(Rutas.Registrar, Usuario, { 'Content-Type': 'application/json', 'Accept': 'application/json' }, 'POST');
}

export async function LoginUser(Usuario) {
    return Peticiones(Rutas.Login, Usuario, { 'Content-Type': 'application/json', 'Accept': 'application/json' }, 'POST');
}

export async function Restablecer(Email) {
    return Peticiones(Rutas.Reset, { Email: Email }, { 'Content-Type': 'application/json', 'Accept': 'application/json' }, 'PUT');
}

function Peticiones(url, Data, Header, Metodo) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: Metodo,
            mode: 'cors',
            body: JSON.stringify(Data),
            headers: Header
        }).then(json => json.json()).then(user => {
            user.Error ? reject(user.Error) : resolve(user);
        }).catch(err => {
            reject('Ha ocurrido un error vuelva a intentar');
        })
    });
}

export async function TokenVerificar(Email, Password, Token) {
    return new Promise((resolve, reject) => {
        fetch(Rutas.VerificarToken, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'token': Token, 'email': Email, 'password': Password }
        }).then(json => {
            resolve(json);
        }).catch(err => {
            reject();
        });
    })
}

export async function CambiarImagen() {
    return new Promise((resolve, reject) => {
        try {
            let result = ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                mediaTypes: 'Images'
            });
            if (!result.cancelled) {
                result.then(img => {
                    resolve(fetchImg(img));
                }).catch(() => {
                    reject({ message: 'Ha ocurrido un error vuelva a intentar' });
                })
            }
        } catch (error) {
            reject({ message: 'Ha ocurrido un error vuelva a intentar' });
        }
    })
}

function fetchImg(img) {
    return new Promise((resolve, reject) => {
        fetch(img.uri).then(res => {
            res.blob().then(blob => {
                resolve(SubirFoto(blob));
            }).catch(() => {
                reject({ message: 'Ha ocurrido un error vuelva a intentar' });
            })
        }).catch(() => {
            reject({ message: 'Ha ocurrido un error vuelva a intentar' });
        })
    })
}


