import * as Actions from '../../actions'

describe('actions', () => {
    it('Send correct add message signal', () => {
        let uid = '20001'
        let msgType = 'text'
        let body = 'hello'
        let isMine = false
        let result = {
          type: 'ADD_MSG',
          uid,
          msgType,
          body,
          isMine
        }
        expect(Actions.addMessage(uid, msgType, body, isMine)).toEqual(result)
    })


    it('Send correct delete message signal', () => {
      let id = 20001
      let result = {
        type: 'DEL_MSG',
        id
      }
      expect(Actions.deleteMessage(id)).toEqual(result)
    })


    it('Send correct setContactFilter signal', () => {
        let username = 'timon'
        let result = {
          type: 'SET_CONTACT_FILTER',
          username
        }
        expect(Actions.setContactFilter(username)).toEqual(result)
    })


    it('Send correct addUser signal', () => {
      let userData = {
        uuid: 2051,
        name: "timon"
      }
      let result = {
        type: 'ADD_USER',
        userData
      }
      expect(Actions.addUser(userData)).toEqual(result)
    })


    it('Send correct removeUser signal', () => {
      let userData = {
        uuid: 2051,
        name: "timon"
      }
      let connectionManager = {some: 'value'}
      let result = {
        type: 'DEL_USER',
        userData,
        connectionManager
      }
      expect(Actions.removeUser(userData, connectionManager)).toEqual(result)
    })


    it('Send correct changeUser signal', () => {
      let userData = {
        uuid: 2051,
        name: "timon"
      }
      let result = {
        type: 'CHG_USER',
        userData
      }
      expect(Actions.changeUser(userData)).toEqual(result)
    })


    it('Send correct login signal', () => {
      let ref = {some: 'value'}
      let username = 'timon'
      let uid = 2211
      let localIP = '192.168.0.1'
      let result = {
        type: 'LOGIN',
        ref,
        username, 
        uid,
        localIP
      }
      expect(Actions.login(ref, username, uid, localIP)).toEqual(result)
    })


    it('Send correct chat signal', () => {
      let uid = 2211
      let result = {
        type: 'CHAT_USER',
        uid
      }
      expect(Actions.chat(uid)).toEqual(result)
    })


    it('Send correct notify signal', () => {
      let type = 'error'
      let message = 'Code phat geya!'
      let result = {
        type: 'ADD_NOTIFICATION',
        notificationType: type,
        message
      }
      expect(Actions.notify(message, type)).toEqual(result)
    })


    it('Send correct unnotify signal', () => {
      let index = 5
      let result = {
        type: 'DEL_NOTIFICATION',
        index
      }
      expect(Actions.unnotify(index)).toEqual(result)
    })


    it('Send correct joinRoom signal', () => {
      let roomRef = {some: 'value'}
      let connectionManager = {some: 'othervalue'}
      let result = {
        type: 'JOIN_ROOM',
        connectionManager,
        roomRef
      }
      expect(Actions.joinRoom(connectionManager, roomRef)).toEqual(result)
    })


    it('Send correct setUsername signal', () => {
      let username = 'timon'
      let result = {
        type: 'SET_USERNAME',
        username
      }
      expect(Actions.setUsername(username)).toEqual(result)
    })


    it('Send correct addFiles signal', () => {
      let id = 2048
      let files = new Array(5)
      let result = {
        type: 'ADD_FILE',
        id,
        files
      }
      expect(Actions.addFiles(id, files)).toEqual(result)
    })
})







