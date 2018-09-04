
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBxlTgDg99WfICIkX4TqiccNTqfndCnjoY",
    authDomain: "livechat-6e105.firebaseapp.com",
    databaseURL: "https://livechat-6e105.firebaseio.com",
    projectId: "livechat-6e105",
    storageBucket: "livechat-6e105.appspot.com",
    messagingSenderId: "419137203609"
};

firebase.initializeApp(config);

export const Auth = firebase.auth();
export const Database  = firebase.database();
export const Firebase = firebase;