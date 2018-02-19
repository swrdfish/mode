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
        try {
            let res = await fetch('http://localhost/api/auth')
            let data = await res.json()
            let ref = firebase.auth()

            await ref.signInWithCustomToken(data.token)
            this.store.dispatch(login(ref, "", data.uid, data.ip))

        } catch(error) {
            this.store.dispatch(notify("failed to authenticate", "error"))
            console.error("failed to authenticate", error)
        }

        setupPeerConnection()
    }

    async setupPeerConnection() {

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