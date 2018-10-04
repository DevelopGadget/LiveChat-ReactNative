import { ImagePicker } from 'expo';
import Rutas from './Rutas';
import { AsyncStorage } from 'react-native';
import CryptoJs from 'crypto-js';

const Headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

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
    return Peticiones(Rutas.Registrar, Usuario, Headers, 'POST');
}

export async function LoginUser(Usuario) {
    return Peticiones(Rutas.Login, Usuario, Headers, 'POST');
}

export async function Restablecer(Email) {
    return Peticiones(Rutas.Reset, { Email: Email }, Headers, 'PUT');
}

export async function CambiarNombre(Nombre, Token) {
    return Peticiones(Rutas.Nombre, { Nombre: Nombre }, Object.assign(Headers, { 'token': Token }), 'PUT');
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

export async function TokenVerificar(user) {
    return new Promise((resolve, reject) => {
        fetch(Rutas.VerificarToken, {
            method: 'GET',
            mode: 'cors',
            headers: Object.assign(Headers, { 'token': user.Token, 'email': user.Email, 'password': user.Password })
        }).then(json => {
            console.log(json);
            switch (json.status) {
                case 202:
                    json.json().then(token => {
                        setDatos({ Token: token, Nombre: user.Nombre, Foto: user.Foto, Email: user.Email, Password: user.Password }, 'User').then(() => {
                            resolve();
                        }).catch(err => {
                            reject();
                        })
                    }).catch(err => {
                        reject();
                    })
                    break;
                case 200:
                    resolve();
                    break;
                default:
                    reject();
                    break;
            }
        }).catch(err => {
            reject();
        })
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


