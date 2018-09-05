import { Auth, Firebase, Database, StorageImages } from './Firebase';
import { ImagePicker, Permissions } from 'expo';

export async function AuthLogin() {
    return new Promise((resolve, reject) => {
        Auth.onAuthStateChanged((User) => {
            if (User) {
                resolve('');
            } else {
                reject('');
            }
        });
    })
}

export async function CambiarImagen() {
    return new Promise((resolve, reject) => {
        try {
            let result = ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                width: 512,
                height: 512,
                mediaTypes: 'Images'
            });
            if (!result.cancelled) {
                result.then(img => {
                    fetch(img.uri).then(res => {
                        res.blob().then(blob => {
                            StorageImages.ref().child(Auth.currentUser.uid).put(blob).then(snap => {
                                resolve();
                            }).catch(err => {
                                reject(err);
                            })
                        })
                    })
                }).catch(() => {
                    reject({ message: 'Ha ocurrido un error vuelva a intentar' });
                })
            }
        } catch (error) {
            reject({ message: 'Ha ocurrido un error vuelva a intentar' });
        }
    })
}

export function Usuario() {
    return Auth.currentUser;
}

export function CambiarNombre(Nombre) {
    return Auth.currentUser.updateProfile({ displayName: Nombre });
}

export function CerrarSesion() {
    return Auth.signOut();
}

export function BorrarCuenta() {
    return new Promise(function (resolve, reject) {
        Database.ref('/' + Auth.currentUser.uid).remove();
        Auth.currentUser.delete().then(() => {
            resolve();
        }).catch(() => {
            reject();
        })
    })
}

export async function LoginAuth(User) {
    return new Promise(function (resolve, reject) {
        Auth.setPersistence(Firebase.auth.Auth.Persistence.LOCAL).then(() => {
            Auth.signInWithEmailAndPassword(User.Email, User.Password).catch(err => {
                reject(err);
            }).then(() => {
                resolve('');
            })
        }).catch(err => {
            reject(err);
        })
    })
}

export async function Registro(User) {
    return await Auth.createUserWithEmailAndPassword(User.Email, User.Password)
        .then(user => {
            Auth.currentUser.updateProfile({ displayName: User.Nombre, photoURL: 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png' }).then(() => {
                Database.ref(Auth.currentUser.uid).set({ Nombre: Auth.currentUser.displayName, Id: Auth.currentUser.uid, Email: Auth.currentUser.email, Foto: Auth.currentUser.photoURL });
                Auth.currentUser.sendEmailVerification();
            });
        })
}

export async function Restablecer(Email) {
    return await Auth.sendPasswordResetEmail(Email);
}

export function Eliminar() {

}