import {initializeApp} from 'firebase/app'
import {getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy} from 'firebase/firestore'

//tähän config-tiedot


initializeApp(firebaseConfig)

const firestore = getFirestore()

const MESSAGES = 'messages'

export {
    firestore,
    collection,
    addDoc,
    MESSAGES,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy
}

//console.log("Firebase toimii!")