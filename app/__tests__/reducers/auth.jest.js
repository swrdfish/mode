import reducer from '../../reducers/auth'

describe('auth reducer', () => {
    it('auth reducer should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should handle LOGIN', () => {
        let ref = {some: 'value'}
        let username = 'timon'
        let uid = 2211
        let localIP = '192.168.0.1'
        let action = {
            type: 'LOGIN',
            ref,
            username, 
            uid,
            localIP
        }
        expect(reducer({}, action)).toEqual({
            ref,
            username,
            uid,
            localIP
        })
    })

    it('should handle LOGOUT', () => {
        let ref = {some: 'value'}
        let username = 'timon'
        let uid = 2211
        let localIP = '192.168.0.1'
        let state = {
            ref,
            username, 
            uid,
            localIP
        }
        expect(reducer(state, {type: 'LOGOUT'})).toEqual({
        })
    })
    
    it('should handle SET_USERNAME', () => {
        let ref = {some: 'value'}
        let username = "timon"
        let uid = 2211
        let localIP = '192.168.0.1'
        let state = {
            ref,
            uid,
            localIP
        }

        let action = {
            type: "SET_USERNAME",
            ref,
            username,
            uid,
            localIP
        }
        expect(reducer(state, action)).toEqual({
            ref,
            username,
            uid,
            localIP
        })
    })
})