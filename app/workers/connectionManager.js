import {addMessage} from '../actions'


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

const createSessionDescriptoin = (desc) => {
    if(window.RTCSessionDescription) {
        return new RTCSessionDescription(desc)
    } else {
        return desc
    }
}

class ConnectionManager {
    constructor(usersRef, myRef, myUid, dispatch) {
        this.usersRef = usersRef
        this.myRef = myRef
        this.myUid = myUid
        this.dispatch = dispatch
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
                localConnection.addIceCandidate(new RTCIceCandidate(conn.iceCandidates[ice]))
            }
        }
    }

    _handleConnectionRequest(snapshot) {
        let conn = snapshot.val()
        if(conn.offer) {
            let context = {
                uid: conn.sender,
                usersRef: this.usersRef,
                connections: this.connections,
                myRef: this.myRef,
                myUid: this.myUid,
                dispatch: this.dispatch
            }

            if(!this.connections[conn.sender]) {
                let localPeerConnection = new RTCPeerConnection(servers, pcConstraint)
                let dataChannel = localPeerConnection.createDataChannel('sendDataChannel', dataConstraint)

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
            localConnection.setRemoteDescription(createSessionDescriptoin(conn.offer))

            localConnection.createAnswer().then(
                this._onCreateAnswer.bind(context),
                this._onCreateSessionDescriptionError
            )
        } else if(conn.answer) {
            let localConnection = this.connections[conn.sender].localPeerConnection
            localConnection.setRemoteDescription(createSessionDescriptoin(conn.answer))            
        }
    }

    _onCreateOffer(desc) {
        let userRef = this.usersRef.child(this.uid)
        let connRef = userRef.child('connections/' + this.myUid)
        this.connections[this.uid].localPeerConnection.setLocalDescription(desc)
        
        connRef.onDisconnect().remove()
        
        connRef.set({
            sender: this.myUid, 
            offer: {
                sdp: desc.sdp,
                type: desc.type
            }
        })
    }

    _onCreateAnswer(desc) {        
        let userRef = this.usersRef.child(this.uid)
        let connRef = userRef.child('connections/' + this.myUid)
        this.connections[this.uid].localPeerConnection.setLocalDescription(desc)
        
        connRef.onDisconnect().remove()

        connRef.set({
            sender: this.myUid, 
            answer: {
                sdp: desc.sdp,
                type: desc.type
            }
        })
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
            connRef.child('sender').set(this.myUid)
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
            let data = JSON.parse(e.data)
            if(data.type == "text") {
                this.dispatch(addMessage(this.uid, "text", data.message, false))
            } else if( data.type == "file") {
                this.dispatch(addMessage(this.uid, "file", data.message.count, false))
            }
        }
    }

    newConnection(uid) {        
        let context = {
            uid,
            usersRef: this.usersRef,
            connections: this.connections,
            myRef: this.myRef,
            myUid: this.myUid,
            dispatch: this.dispatch
        }

        // Create peer connection.
        let localPeerConnection = new RTCPeerConnection(servers, pcConstraint)

        // Create data channel
        let dataChannel = localPeerConnection.createDataChannel('sendDataChannel', dataConstraint)
        dataChannel.binaryType = 'arraybuffer';

        this.connections[uid] = {
            localPeerConnection,
            dataChannel
        }

        // Attach event handlers
        localPeerConnection.onicecandidate = this._iceCallback.bind(context)
        localPeerConnection.ondatachannel = this._onDataChannel.bind(context)
        dataChannel.onopen = this._onSendChannelStateChange
        dataChannel.onclose = this._onSendChannelStateChange
        

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
        let conn = this.getConnection(uid)
        conn.dataChannel.close()
        conn.localPeerConnection.close()
        conn.dataChannel = null
        conn.localPeerConnection = null
    }
}


const mapStateToProps = ({dispatch}) => ({
  dispatch
})

export default ConnectionManager