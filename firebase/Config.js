import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_APIKEY,
    authDomain: process.env.EXPO_PUBLIC_AUTDOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKER,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID
}

initializeApp(firebaseConfig)

const firestore = getFirestore()

const MESSAGES = 'messages'

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES
}