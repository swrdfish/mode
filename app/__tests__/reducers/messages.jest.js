import reducer from '../../reducers/messages'


jest.mock('node-uuid', () => {
    return {
        v4: jest.fn(() => 456)
    };
});


describe('messages reducer', () => {
    let _Date
    beforeAll(() => {
        _Date = Date
        Date = jest.fn(() => 'today')
    });

    afterAll(() => {
        Date = _Date
        jest.unmock('node-uuid')
    });

    it('messages reducer should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should handle ADD_MSG', () => {
        let uid = 1234
        let msgType= 'text'
        let body = 'something'
        let isMine = true
        let sent = false
        let timeStamp = new Date()
        let id = 456

        let action = {
            type: 'ADD_MSG',
            uid,
            msgType,
            body,
            isMine
        }

        let msg1 = {
            type: msgType,
            body,
            sent,
            timeStamp,
            isMine,
            id
        }

        expect(reducer({}, action)).toEqual({
            '1234': [msg1] 
        })

        let initialState = {
            '1234': [msg1]
        }

        expect(reducer(initialState, action)).toEqual({
            '1234': [msg1, msg1]
        })

        action.uid = 4567
        expect(reducer(initialState, action)).toEqual({
            '1234': [msg1],
            '4567': [msg1]
        })
    })

    it('should handle DEL_USER', () => {
        let uid = 1234
        let msgType= 'text'
        let body = 'something'
        let isMine = true
        let sent = false
        let timeStamp = new Date()
        let id = 456
        
        let action = {
            type: 'DEL_USER',
            userData: {
                uid
            }
        }
        
        let msg1 = {
            type: msgType,
            body,
            sent,
            timeStamp,
            isMine,
            id
        }

        let initialState = {
            '1234': [msg1]
        }

        expect(reducer(initialState, action)).toEqual({})
    })

    it('should handle AKN_MSG', () => {
        // TODO: Implement
        let uid = 1234
        let msgType= 'text'
        let body = 'something'
        let isMine = true
        let sent = false
        let timeStamp = new Date()
        let id = 456
        
        let action = {
            type: 'AKN_MSG',
            userData: {
                uid
            }
        }
        
        let msg1 = {
            type: msgType,
            body,
            sent,
            timeStamp,
            isMine,
            id
        }

        let initialState = {
            '1234': [msg1]
        }

        expect(reducer(initialState, action)).toEqual(initialState)
    })

    
    it('should handle SEE_MSG', () => {
        // TODO: Implement
        let uid = 1234
        let msgType= 'text'
        let body = 'something'
        let isMine = true
        let sent = false
        let timeStamp = new Date()
        let id = 456
        
        let action = {
            type: 'SEE_MSG',
            userData: {
                uid
            }
        }
        
        let msg1 = {
            type: msgType,
            body,
            sent,
            timeStamp,
            isMine,
            id
        }

        let initialState = {
            '1234': [msg1]
        }

        expect(reducer(initialState, action)).toEqual(initialState)
    })
})