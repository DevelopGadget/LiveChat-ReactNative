import { Auth, Firebase, Database, StorageImages } from './Firebase';
import { ImagePicker } from 'expo';

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

export async function TodosLosUsuarios() {
    return new Promise((resolve, reject) => {
        Database.ref('/').once('value').then(snap => {
            var us = [];
            snap.forEach(Item => {
                if (Item.toJSON().Id !== Auth.currentUser.uid) {
                    us.push(Item.toJSON());
                }
            })
            resolve(us);
        }).catch(() => {
            reject();
        })
    })
}

export async function Seguidos(){
    return new Promise((resolve, reject) => {
        Database.ref(Auth.currentUser.uid + '/Seguidos').once('value').then(res => {
            var ArrayU = [];
            res.forEach(Item => {
                Database.ref(Item.toJSON().Id).once('value').then(Snap => {
                    ArrayU.push(Snap.toJSON());
                })
            })
            resolve(ArrayU);
        }).catch(() => {
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

function SubirFoto(blob) {
    return new Promise((resolve, reject) => {
        StorageImages.ref().child(Auth.currentUser.uid).put(blob).then(snap => {
            snap.ref.getDownloadURL().then((res) => {
                Auth.currentUser.updateProfile({ photoURL: res });
                Database.ref(Auth.currentUser.uid).set({ Nombre: Auth.currentUser.displayName, Id: Auth.currentUser.uid, Email: Auth.currentUser.email, Foto: res });
                resolve();
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}

export function Usuario() {
    return Auth.currentUser;
}

export function CambiarNombre(Nombre) {
    return Auth.currentUser.updateProfile({ displayName: Nombre.toUpperCase() }).then((user) => {
        Database.ref(Auth.currentUser.uid).set({ Nombre: Nombre, Id: Auth.currentUser.uid, Email: Auth.currentUser.email, Foto: Auth.currentUser.photoURL });
    })
}

export function CerrarSesion() {
    return Auth.signOut();
}

export function Seguir(Id) {
    return new Promise(function (resolve, reject) {
        Database.ref(Auth.currentUser.uid + '/Seguidos').once('value').then(snap => {
            if (snap.exists()) {
                snap.forEach(Item => {
                    if (Item.toJSON().Id == Id) {
                        Item.ref.remove().then(() => {
                            Database.ref(Id + '/Seguidores').once('value').then(res => {
                                res.forEach(Item2 => {
                                    if (Item2.toJSON().Id == Auth.currentUser.uid) {
                                        Item2.ref.remove();
                                    }
                                })
                            })
                            resolve(false);
                        }).catch(() => {
                            reject();
                        })
                    } else {
                        Database.ref(Auth.currentUser.uid + '/Seguidos').push({ Id: Id }).then(() => {
                            Database.ref(Id + '/Seguidores').push({ Id: Auth.currentUser.uid }).then(() => {
                                resolve(true);
                            })
                        }).catch(() => {
                            reject();
                        })
                    }
                })
            } else {
                Database.ref(Auth.currentUser.uid + '/Seguidos').push({ Id: Id }).then(() => {
                    Database.ref(Id + '/Seguidores').push({ Id: Auth.currentUser.uid }).then(() => {
                        resolve(true);
                    })
                }).catch(() => {
                    reject();
                })
            }
        })
    })
}

export function Seguidor(Id) {
    return new Promise(function (resolve, reject) {
        Database.ref(Auth.currentUser.uid + '/Seguidos').once('value').then(snap => {
            snap.forEach(Item => {
                if(Item.toJSON().Id == Id){
                    resolve(true);
                }
            })
            resolve(false);
        })
    });
}

export function BorrarCuenta() {
    return new Promise(function (resolve, reject) {
        StorageImages.ref().child(Auth.currentUser.uid).delete().then(() => {
            Eliminar().then(() => {
                Database.ref('/' + Auth.currentUser.uid).remove();
                resolve();
            }).catch((err) => {
                reject(err);
            })
        }).catch(err => {
            Eliminar().then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            })
        })
    })
}

function Eliminar() {
    return new Promise(function (resolve, reject) {
        Auth.currentUser.delete().then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
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
            Auth.currentUser.updateProfile({ displayName: User.Nombre.toUpperCase(), photoURL: 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png' }).then(() => {
                Database.ref(Auth.currentUser.uid).set({ Nombre: Auth.currentUser.displayName, Id: Auth.currentUser.uid, Email: Auth.currentUser.email, Foto: Auth.currentUser.photoURL, Seguidos: {}, Seguidores: {} });
                Auth.currentUser.sendEmailVerification();
            });
        })
}

export async function Restablecer(Email) {
    return await Auth.sendPasswordResetEmail(Email);
}