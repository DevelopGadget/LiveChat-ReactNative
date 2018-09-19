import { ImagePicker } from 'expo';
import Rutas from './Rutas';
import { AsyncStorage } from 'react-native';

export async function setDatos(Data, Key){
    return await AsyncStorage.setItem(Key, JSON.stringify(Data));
}

export async function getDatos(Key){
   return await AsyncStorage.getItem(Key);
}

export async function RegistrarUser(Usuario) {
    return PostSinToken(Rutas.Registrar, Usuario);
}

export async function LoginUser(Usuario) {
    return PostSinToken(Rutas.Login, Usuario);
}

function PostSinToken(url, Data) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(Data),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }).then(json => json.json()).then(user => {
            user.Error ? reject(user.Error) : resolve(user);
        }).catch(err => {
            reject('Ha ocurrido un error vuelva a intentar');
        })
    });
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


