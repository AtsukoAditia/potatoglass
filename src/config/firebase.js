import firebase from 'firebase'
import constant from '@/config/constant'
let dbInit
let firebaseAppInit
if (process.env.VUE_APP_FIREBASE === 'true') {
  firebaseAppInit = firebase.initializeApp(constant.firebaseConfig)

  dbInit = firebaseAppInit.firestore()
}
export const db = dbInit
export const firebaseApp = firebaseAppInit

export const storageRef = firebaseAppInit.storage().ref()

export const usersRef = db.collection('users')
export const roomsRef = db.collection('chatRooms')
export const messagesRef = roomId => roomsRef.doc(roomId).collection('messages')

export const filesRef = storageRef.child('files')

export const dbTimestamp = firebase.firestore.FieldValue.serverTimestamp()
export const deleteDbField = firebase.firestore.FieldValue.delete()
