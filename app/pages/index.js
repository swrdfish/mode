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
import clientConfig from '../private/clientSecret.json'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.store = createStore(reducer)
    }

    async componentDidMount() {
        firebase.initializeApp(clientConfig)
        
        let res  = await fetch('http://localhost/api/auth')
        let data = await res.json()
        firebase.auth().signInWithCustomToken(data.token).catch(error => {
            console.log(error)
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
                        <Sidebar />
                        <MessageArea />
                    </Page>
                </div>
            </Provider>
        )
    }

    checkWebRTCSupport() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            // window.util is a part of PeerJS library
            if (window.util.supports.sctp) {
                resolve();
            } else {
                reject('browser-unsupported');
            }
        });
    }
}

export default App