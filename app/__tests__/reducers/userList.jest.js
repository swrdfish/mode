import reducer from '../../reducers/userList'
import ConnectionManager from '../../workers/connectionManager'


jest.mock('../../workers/connectionManager');

describe('userList reducer', () => {
    it('userList reducer should return initial state', () => {
        expect(reducer(undefined, {})).toEqual([])
    })

    it('should handle ADD_USER', () => {
        let userData = {
            foo: 'bar'
        }

        let action = {
            type: 'ADD_USER',
            userData
        }

        expect(reducer([], action)).toEqual([userData])

        expect(reducer([userData], action)).toEqual([userData, userData])
    })

    it('should handle DEL_USER', () => {
        let userData = {
            uid: 1234,
            foo: 'bar'
        }

        let connectionManager = new ConnectionManager()

        let action = {
            type: 'DEL_USER',
            userData,
            connectionManager
        }

        expect(reducer([userData], action)).toEqual([])
        expect(connectionManager.closeConnection).toHaveBeenCalled()
    })

    it('should handle CHG_USER', () => {
        let userData = {
            uid: 1234,
            foo: 'bar',
            selected: true,
            unseen: 5
        }

        let newUserData = {
            uid: 1234,
            foo: 'boo',
            selected: true,
            unseen: 6   
        }

        let action = {
            type: 'CHG_USER',
            userData: newUserData
        }

        expect(reducer([userData], action)).toEqual([{
            uid: 1234,
            foo: 'boo',
            selected: true,
            unseen: 5
        }])
    })

    it('should handle ADD_MSG', () => {
        let userData = {
            uid: 1234,
            foo: 'bar',
            selected: true,
            unseen: 5
        }

        let action = {
            type: 'ADD_MSG',
            uid: 1234
        }

        expect(reducer([userData], action)).toEqual([{
            uid: 1234,
            foo: 'bar',
            selected: true,
            unseen: 5
        }])

        userData.selected = false

        expect(reducer([userData], action)).toEqual([{
            uid: 1234,
            foo: 'bar',
            selected: false,
            unseen: 6
        }])

        action.uid = 4567
        expect(reducer([userData], action)).toEqual([{
            uid: 1234,
            foo: 'bar',
            selected: false,
            unseen: 5
        }])
    })

    it('should handle CHAT_USER', () => {
        let userData = {
            uid: 1234,
            foo: 'bar',
            selected: true,
            unseen: 5
        }

        let action = {
            type: 'CHAT_USER',
            uid: 1234
        }

        expect(reducer([userData], action)).toEqual([{
            uid: 1234,
            foo: 'bar',
            selected: true,
            unseen: undefined
        }])
    })
})