import { Auth, Firebase } from './Firebase';

export function AuthLogin() {
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

export function Usuario(){
    return Auth.currentUser;
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
                Auth.currentUser.sendEmailVerification();
            });
        })
}

export async function Restablecer(Email) {
    return await Auth.sendPasswordResetEmail(Email);
}

export function Eliminar() {

}