import React from 'react'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import { createStore } from 'redux'
import fetch from 'isomorphic-fetch'
import * as firebase from 'firebase'


import Head from 'next/head'
import Page from '../components/Page.js'
import Sidebar from '../components/Sidebar.js'
import MessageArea from '../components/MessageArea.js'
import NotificationArea from '../components/NotificationArea.js'
import clientConfig from '../private/clientSecret.json'
import {login, notify} from '../actions'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.store = createStore(reducer)
    }

    async componentDidMount() {
        firebase.initializeApp(clientConfig)
        let data
        try {
            let res = await fetch('http://localhost/api/auth')
            data = await res.json()
            let ref = firebase.auth()

            await ref.signInWithCustomToken(data.token)
            this.store.dispatch(login(ref, "", data.uid, data.ip))
            this.store.dispatch(notify("Authentication successful", "info"))
        } catch(error) {
            this.store.dispatch(notify("failed to authenticate", "error"))
            console.error("failed to authenticate", error)
        }

        await this.joinRoom(firebase.database(), data)
    }

    async joinRoom(firedb, userData) {
        let room
        try {
            let res = await fetch('http://localhost/api/room')
            room = await res.json()
        } catch(error) {
            console.error("failed to get room id: ", error)
            this.store.dispatch(notify("failed to get room id", "error"))
        }

        // Setup Firebase refs
        let connectionRef = firedb.ref('.info/connected')
        let roomRef = firedb.ref('rooms/' + room.name)
        let usersRef = roomRef.child('users')
        let userRef = usersRef.child(userData.uid)

        
        // Remove yourself from the room when disconnected
        userRef.onDisconnect().remove()
        
        console.log('Joining room: ' + room.name)
        // Join the room
        userRef.set(userData, (error) => {
            if (error) {
                this.store.dispatch(notify("Firebase: Adding user to the room failed.", "error"))
                console.error('Firebase: Adding user to the room failed: ', error)
            } else {
                this.store.dispatch(notify("Firebase: Successfully added user to the room.", "info"))
                console.log('Firebase: User added to the room')        
            }
        })

        // On child added create a new user in the sidebar
        usersRef.on('child_added', (snapshot) => {
            let user = snapshot.val()
            console.log('Room:\t user_added: ', user)
        })

        // On child removed remove the user from the sidebar
        usersRef.on('child_removed',  (snapshot) => {
            let user = snapshot.val()
            console.log('Room:\t user_removed: ', user)
        })

        // On child change
        userRef.on('child_changed', (snapshot) => {
            let user = snapshot.val()
            console.log('Room:\t user_changed: ', user)
        })
    }

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="stylesheet" href="/static/css/bootstrap.css" />
                        <link rel="stylesheet" href="/static/css/main.css" />
                        <link rel="stylesheet" href="static/css/font-awesome.min.css" />
                        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
                        <title>Adda</title>
                    </Head>
                    <Page>
                        <NotificationArea />
                        <Sidebar />
                        <MessageArea />
                    </Page>
                </div>
            </Provider>
        )
    }
}

export default App