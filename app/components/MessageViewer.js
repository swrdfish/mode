import React from 'react'


class MessageViewer extends React.Component {
    constructor(props) {
        super(props)
        this.onDescription = this.onDescription.bind(this)
        this.onConnection = this.onConnection.bind(this)
    }

    makeConnection() {
        console.log('have to connect to ', this.props.chatter && this.props.chatter.publicIP)
        const servers = null  // Allows for RTC server configuration (STUN and TURN).
        const pcConstraint = null
        const dataConstraint = null
        
        // Create peer connection.
        this.localPeerConnection = new RTCPeerConnection(servers, pcConstraint)

        this.sendChannel = this.localPeerConnection.createDataChannel('sendDataChannel', dataConstraint)

        // Attach event handlers
        this.localPeerConnection.onicecandidate = this.iceCallback
        this.sendChannel.onopen = this.onSendChannelStateChange
        this.sendChannel.onclose = this.onSendChannelStateChange

        var mediaConstraints = {
            mandatory: {
                'OfferToReceiveAudio': true,
                'OfferToReceiveVideo': true
            },
            'offerToReceiveAudio': true,
            'offerToReceiveVideo': true    
        }

        this.localPeerConnection.createOffer(mediaConstraints).then(
          this.onDescription,
          this.onCreateSessionDescriptionError
        )
    }

    onDescription(desc) {
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
        console.log('local ice callback')
    }

    onSendChannelStateChange() {
        console.log('sendChannel state changed', this.sendChannel)    
    }

    onConnection(snapshot) {
        if(snapshot.val() && snapshot.val().peerConnection){
            this.localPeerConnection.setRemoteDescription(snapshot.val().peerConnection.desc)
            console.log('setRemoteDescription')
        }
    }

    render(){
        if(this.props.userRef) {
            if(this.localPeerConnection === undefined){
                this.makeConnection()
                this.props.myRef.on('value', this.onConnection)
            }
            let localIP = this.props.userRef.once('value').then((snapshot) => console.log(snapshot.val().localIP))
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