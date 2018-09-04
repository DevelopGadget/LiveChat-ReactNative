import { Auth, Firebase } from './Firebase';

export function Login(User) {

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