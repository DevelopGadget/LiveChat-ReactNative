import { Auth, Firebase, Database } from './Firebase';

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
        Auth.currentUser.delete().then(() => {
            Database.ref(Auth.currentUser.uid).remove();
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
                Database.ref(Auth.currentUser.uid).set({ Nombre: Auth.currentUser.displayName, Id: Auth.currentUser.uid, Email: Auth.currentUser.email });
                Auth.currentUser.sendEmailVerification();
            });
        })
}

export async function Restablecer(Email) {
    return await Auth.sendPasswordResetEmail(Email);
}

export function Eliminar() {

}