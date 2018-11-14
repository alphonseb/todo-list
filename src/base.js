import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDF96EsLppxntCwDnIeY8coC9Nm_BGZzCg',
    authDomain: 'todolist-3983a.firebaseapp.com',
    databaseURL: 'https://todolist-3983a.firebaseio.com'
})

const base = Rebase.createClass(firebaseApp.database())

export default base
