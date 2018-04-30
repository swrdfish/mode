class ConnectionManager {
    constructor(usersRef, myRef) {
        this.usersRef = usersRef
        this.myRef = myRef
        this.myConnectionRef = myRef.child('connections')
        this.connections = {}

        // listen for connections
        myConnectionRef.on('child_added', this._handleConnectionRequest)

        // bind functions
        this._handleConnectionRequest = this._handleConnectionRequest.bind(this)
    }

    _handleConnectionRequest(snapshot) {
        let conn = snapshot.val()
    }

    newConnection(uid) {
        console.log('create new connection to user: ', uid)
    }

    getConnection(uid) {
        console.log('get the connection for user: ', uid)
    }

    closeConnection(uid) {
        console.log('close the connection for the user: ', uid)
    }
}