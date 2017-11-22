import React from 'react'
import { Provider } from 'react-redux'
import { reducer, initStore, startClock } from '../store'
import fetch from 'isomorphic-fetch'

import Head from 'next/head'
import Page from '../components/Page.js'


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
        console.log('will mount')
        this.data = data
    }

    componentWillUpdate() {
        console.log('will update')
        console.log(this.data)
    }

    render() {
        return ( 
            <Provider store={this.store}>
                <div>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="stylesheet" href="/static/css/bootstrap.css" />
                        <link rel="stylesheet" href="/static/css/main.css" />
                    </Head>
                    <Page>
                        <div>Hello</div>
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