import React from 'react'


class MessageViewer extends React.Component {
    constructor(props) {
        super(props)
        this.onCreateOffer = this.onCreateOffer.bind(this)
        this.onCreateAnswer = this.onCreateAnswer.bind(this)
        this.onConnection = this.onConnection.bind(this)
        this.iceCallback = this.iceCallback.bind(this)
        this.onDataReceive = this.onDataReceive.bind(this)
    }

    makeConnection() {
        console.log('have to connect to ', this.props.chatter && this.props.chatter.publicIP)
        const servers = null  // Allows for RTC server configuration (STUN and TURN).
        const pcConstraint = null
        const dataConstraint = null
        
        // Create peer connection.
        this.localPeerConnection = new RTCPeerConnection(servers, pcConstraint)
        this.localPeerConnection.ondatachannel = this.onDataReceive

        this.sendChannel = this.localPeerConnection.createDataChannel('sendDataChannel', dataConstraint)

        // Attach event handlers
        this.localPeerConnection.onicecandidate = this.iceCallback
        this.sendChannel.onopen = this.onSendChannelStateChange
        this.sendChannel.onclose = this.onSendChannelStateChange

        window.sender = this.sendChannel

        var mediaConstraints = {
            mandatory: {
                'OfferToReceiveAudio': true,
                'OfferToReceiveVideo': true
            },
            'offerToRec eiveAudio': true,
            'offerToReceiveVideo': true    
        }

        this.localPeerConnection.createOffer(mediaConstraints).then(
          this.onCreateOffer,
          this.onCreateSessionDescriptionError
        )
    }

    onCreateOffer(desc) {
        let connRef = this.props.userRef.child('peerConnection')
        this.localPeerConnection.setLocalDescription(desc)
        console.log('setLocalDescription')
        connRef.set({
            uid: this.props.myUid,
            desc: desc
        })
    }

    onCreateAnswer(desc) {
        let connRef = this.props.userRef.child('peerConnection')
        this.localPeerConnection.setLocalDescription(desc)
        console.log('setLocalDescription')
        connRef.set({
            uid: this.props.myUid,
            desc: desc
        })    
    }

    onCreateSessionDescriptionError(e) {
        console.error("Failed to create offfer:", e)
    }

    iceCallback(event) {
        if (event.candidate) {
            console.log('set icecandidate', event.candidate)
            let connRef = this.props.userRef.child('ice')
            connRef.set({
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            })
        }
    }

    onSendChannelStateChange() {
        console.log('sendChannel state changed', this.sendChannel)    
    }

    onConnection(snapshot) {
        console.log('onConnection', snapshot.val())

        // set remote description
        if(snapshot.val() && snapshot.val().peerConnection){
            if(snapshot.val().peerConnection.desc.type == 'offer') {
                console.log('setRemoteDescription')
                this.localPeerConnection.setRemoteDescription(snapshot.val().peerConnection.desc)
                this.localPeerConnection.createAnswer().then(
                    this.onCreateAnswer,
                    this.onCreateSessionDescriptionError
                )
            }
            if(snapshot.val().peerConnection.desc.type == 'answer') {
                console.log('setLocalDescription')
                this.localPeerConnection.setLocalDescription(snapshot.val().peerConnection.desc)
            }
        }

        // set icecanditate
        if(snapshot.val() && snapshot.val().ice) {
            let candidate = new RTCIceCandidate({
                sdpMLineIndex: snapshot.val().ice.label,
                candidate: snapshot.val().ice.candidate
            })
            this.localPeerConnection.addIceCandidate(candidate)
        }
    }

    onDataReceive(event) {
        receiveChannel = event.channel;
        receiveChannel.onmessage = onReceiveMessage;
        receiveChannel.onopen = onReceiveChannelStateChange;
        receiveChannel.onclose = onReceiveChannelStateChange;
    }

    onReceiveMessage(event) {
        console.log("MSG: ", event.data)
    }

    onReceiveChannelStateChange() {
        console.log("receive channel state changed: ", receiveChannel.readyState)
    }

    render(){
        if(this.props.userRef) {
            if(this.localPeerConnection === undefined){
                this.makeConnection()
                this.props.myRef.on('value', this.onConnection)
            }
            return (
                <div className='message-view-wrapper'>
                    connecting ..
                </div>
            )
        } else {
            return (
                <div className='message-view-wrapper'>
                    select someone to chat with.
                </div>
            )
        }
    }
}

export default MessageViewer