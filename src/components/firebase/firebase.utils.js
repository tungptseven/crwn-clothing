import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD2IhtmM12penoSkHQBJSHOPOAuqZ3qWic",
  authDomain: "crwn-db-470cb.firebaseapp.com",
  projectId: "crwn-db-470cb",
  storageBucket: "crwn-db-470cb.appspot.com",
  messagingSenderId: "772982189663",
  appId: "1:772982189663:web:e7a1e84b9c114119e835ea"
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase