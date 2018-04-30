const servers = { // Allows for RTC server configuration (STUN and TURN).
    iceServers: [
        {urls:'stun:stun.l.google.com'},
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'helloworld',
            username: 'ghoshbinayak@gmail.com'
        }
    ]
}

const pcConstraint = null
const dataConstraint = null            


class ConnectionManager {
    constructor(usersRef, myRef, myUid) {
        this.usersRef = usersRef
        this.myRef = myRef
        this.myUid = myUid
        this.myConnectionRef = myRef.child('connections')
        this.connections = {}
        
        // bind functions
        this._handleConnectionRequest = this._handleConnectionRequest.bind(this)
        this._handleICECandidate = this._handleICECandidate.bind(this)

        // listen for connections
        this.myConnectionRef.on('child_added', this._handleConnectionRequest)
        this.myConnectionRef.on('child_changed', this._handleICECandidate)
    }

    _handleICECandidate(snapshot) {
        let conn = snapshot.val()
        if(conn.iceCandidates) {
            let localConnection = this.connections[conn.sender].localPeerConnection
            for(let ice in conn.iceCandidates) {
                console.log('add iceCandidates: ', conn.iceCandidates[ice]) 
                localConnection.addIceCandidate(new RTCIceCandidate(conn.iceCandidates[ice])) 
            }
        }
    }

    _handleConnectionRequest(snapshot) {
        let conn = snapshot.val()
        console.log("connection manager: _handleConnectionRequest ", conn)
        if(conn.offer) {
            let context = {
                uid: conn.sender,
                usersRef: this.usersRef,
                connections: this.connections,
                myRef: this.myRef,
                myUid: this.myUid
            }

            if(!this.connections[conn.sender]) {
                let localPeerConnection = new RTCPeerConnection(servers, pcConstraint)
                let dataChannel = localPeerConnection.createDataChannel('sendDataChannel', dataConstraint)

                // make data Channel available for testing
                // TODO: remove this
                window.dataChannel = dataChannel

                this.connections[conn.sender] = {
                    localPeerConnection,
                    dataChannel
                }

                // Attach event handlers
                localPeerConnection.onicecandidate = this._iceCallback.bind(context)
                localPeerConnection.ondatachannel = this._onDataChannel.bind(context)
                dataChannel.onopen = this._onSendChannelStateChange
                dataChannel.onclose = this._onSendChannelStateChange
            }

            let localConnection = this.connections[conn.sender].localPeerConnection
            localConnection.setRemoteDescription(new RTCSessionDescription(conn.offer))

            localConnection.createAnswer().then(
                this._onCreateAnswer.bind(context),
                this._onCreateSessionDescriptionError
            )
        } else if(conn.answer) {
            let localConnection = this.connections[conn.sender].localPeerConnection
            localConnection.setRemoteDescription(new RTCSessionDescription(conn.answer))            
        }
    }

    _onCreateOffer(desc) {
        let userRef = this.usersRef.child(this.uid)
        let connRef = userRef.child('connections/' + this.myUid)
        this.connections[this.uid].localPeerConnection.setLocalDescription(desc)
        
        connRef.set({
            sender: this.myUid, 
            offer: desc.toJSON()
        })

        console.log('createOffer', desc)
    }

    _onCreateAnswer(desc) {        
        let userRef = this.usersRef.child(this.uid)
        let connRef = userRef.child('connections/' + this.myUid)
        this.connections[this.uid].localPeerConnection.setLocalDescription(desc)
        
        connRef.set({
            sender: this.myUid, 
            answer: desc.toJSON()
        })

        console.log('createAnswer', desc)
    }

    _iceCallback(event) {
        if(event.candidate) {
            let userRef = this.usersRef.child(this.uid)
            let connRef = userRef.child('connections/' + this.myUid)
            let iceRef = connRef.child('iceCandidates')

            let iceCandidate = {
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                sdpMid: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            }

            iceRef.push(iceCandidate)
        }
    }

    _onCreateSessionDescriptionError(e) {
        console.error("Failed to create offfer:", e)
    }

    _onSendChannelStateChange(e) {
        console.log('sendChannel state changed:', e)    
    }

    _onDataChannel(event) {
        let receiver = event.channel
        receiver.onmessage = (e) => {
            console.log(e.data)
        }
    }

    newConnection(uid) {        
        let context = {
            uid,
            usersRef: this.usersRef,
            connections: this.connections,
            myRef: this.myRef,
            myUid: this.myUid
        }

        // Create peer connection.
        let localPeerConnection = new RTCPeerConnection(servers, pcConstraint)

        // Create data channel
        let dataChannel = localPeerConnection.createDataChannel('sendDataChannel', dataConstraint)

        // make data Channel available for testing
        // TODO: remove this
        window.dataChannel = dataChannel

        this.connections[uid] = {
            localPeerConnection,
            dataChannel
        }

        // Attach event handlers
        localPeerConnection.onicecandidate = this._iceCallback.bind(context)
        localPeerConnection.ondatachannel = this._onDataChannel.bind(context)
        dataChannel.onopen = this._onSendChannelStateChange
        dataChannel.onclose = this._onSendChannelStateChange
        

        window.sender = dataChannel

        var mediaConstraints = {
            mandatory: {
                'OfferToReceiveAudio': true,
                'OfferToReceiveVideo': true
            },
            'offerToRec eiveAudio': true,
            'offerToReceiveVideo': true    
        }

        localPeerConnection.createOffer(mediaConstraints).then(
          this._onCreateOffer.bind(context),
          this._onCreateSessionDescriptionError
        )

        return this.connections[uid]
    }

    getConnection(uid) {
        if (this.connections[uid]) {
            return this.connections[uid]
        } else {
            return this.newConnection(uid)
        }
    }

    closeConnection(uid) {
        console.log('close the connection for the user: ', uid)
    }
}

export default ConnectionManager