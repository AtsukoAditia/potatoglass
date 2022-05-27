/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */

importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js')

var config = {
  databaseURL: 'https://boma-a5241.firebaseio.com',
  apiKey: 'AIzaSyDzBHZEGdk8O172ExQ2BeYJIXIMni_-WVI',
  authDomain: 'boma-a5241.firebaseapp.com',
  projectId: 'boma-a5241',
  storageBucket: 'boma-a5241.appspot.com',
  messagingSenderId: '1023189231134',
  appId: '1:1023189231134:web:cb6c8fb8cf8f2d5fb6700f'
}

firebase.initializeApp(config)

const messaging = firebase.messaging()
