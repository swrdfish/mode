import React from 'react'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import { createStore } from 'redux'
import fetch from 'isomorphic-fetch'
import * as firebase from 'firebase'


import Head from 'next/head'
import Page from '../components/Page'
import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'
import NotificationArea from '../components/NotificationArea'
import clientConfig from '../private/clientSecret.json'
import ConnectionManager from '../workers/connectionManager'
import {login, notify, addUser, removeUser, changeUser, joinRoom} from '../actions'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.store = createStore(reducer)
    }

    async componentDidMount() {
        firebase.initializeApp(clientConfig)
        let data
        try {
            let res = await fetch('/api/auth')
            data = await res.json()
            let ref = firebase.auth()

            await ref.signInWithCustomToken(data.token)
            data.localIP = await this.getLocalIP()
            this.store.dispatch(login(ref, "", data.uid, data.localIP))
        } catch(error) {
            this.store.dispatch(notify("failed to authenticate", "error"))
            console.error("failed to authenticate", error)
        }

        await this.joinRoom(firebase.database(), data)
    }

    async joinRoom(firedb, userData) {
        let room
        try {
            let res = await fetch('/api/room')
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

        // Initialize the connection manager
        let connectionManager = new ConnectionManager(usersRef, userRef, userData.uid, this.store.dispatch)

        // Make the room ref and connection manager globally accessible
        this.store.dispatch(joinRoom(connectionManager, roomRef))
        
        // Remove yourself from the room when disconnected
        userRef.onDisconnect().remove()
                
        // Join the room
        userRef.set(userData, (error) => {
            if (error) {
                this.store.dispatch(notify("Firebase: Adding user to the room failed.", "error"))
                console.error('Firebase: Adding user to the room failed: ', error)
            }
        })

        // On child added create a new user in the sidebar
        usersRef.on('child_added', (snapshot) => {
            let user = snapshot.val()
            if (user.uid !== userData.uid) {
                this.store.dispatch(addUser(user))
            }
        })

        // On child removed remove the user from the sidebar
        usersRef.on('child_removed',  (snapshot) => {
            let user = snapshot.val()
            this.store.dispatch(removeUser(user, connectionManager))
        })

        // On child change
        usersRef.on('child_changed', (snapshot) => {
            let user = snapshot.val()
            this.store.dispatch(changeUser(user))
        })
    }

    async getLocalIP() {
        return new Promise((resolve, reject) => {
            window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection   //compatibility for firefox and chrome
            var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){}      
            pc.createDataChannel("")    //create a bogus data channel
            pc.createOffer(pc.setLocalDescription.bind(pc), noop)    // create offer and set local description
            pc.onicecandidate = function(ice){  //listen for candidate events
                if(!ice || !ice.candidate || !ice.candidate.candidate)  return
                var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1]
                resolve(myIP)   
                pc.onicecandidate = noop
            };
        })
    }

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel='shortcut icon' type='image/x-icon' href='/static/img/favicon.ico' />
                        <link rel="stylesheet" href="/static/css/bootstrap.css" />
                        <link rel="stylesheet" href="/static/css/main.css" />
                        <link rel="stylesheet" href="static/css/font-awesome.min.css" />
                        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
                        <title>হিজিবিজি (HiJiBiJi)</title>
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