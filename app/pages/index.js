import React from 'react'
import { Provider } from 'react-redux'
import { reducer, initStore, startClock } from '../store'
import fetch from 'isomorphic-fetch'

import Head from 'next/head'
import Page from '../components/Page.js'
import Sidebar from '../components/Sidebar.js'
import MessageArea from '../components/MessageArea.js'


class App extends React.Component {

    static getInitialProps({ req }) {
        const isServer = !!req
        const store = initStore(reducer, null, isServer)
        return { initialState: store.getState(), isServer }
    }

    constructor(props) {
        super(props)
        this.store = initStore(reducer, props.initialState, props.isServer)
    }

    async componentWillMount() {
        let res = await fetch('http://localhost/api/room')
        let data = await res.json()
        this.data = data
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