import reducer from '../../reducers/chatArea'

describe('chatArea reducer', () => {
    it('chatArea reducer should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should handle CHAT_USER', () => {
        let uid = 2211
        let action = {
            type: "CHAT_USER",
            uid
        }
        expect(reducer({}, action)).toEqual({
            uid
        })

        action.uid = 3322
        expect(reducer({uid}, action)).toEqual({
            uid: 3322
        })
    })

    it('should handle DEL_USER', () => {
        let uid = 2211
        let action = {
            type: 'DEL_USER',
            userData: {
                uid
            }
        }
        expect(reducer({uid}, action)).toEqual({})
        
        uid = 3344
        expect(reducer({uid}, action)).toEqual({uid})
    })
})