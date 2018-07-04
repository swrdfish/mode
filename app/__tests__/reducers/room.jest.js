import reducer from '../../reducers/room'

describe('room reducer', () => {
    it('room reducer should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should handle JOIN_ROOM', () => {
        let roomRef = "someting"
        let connectionManager = "someting else"

        let action = {
            type: "JOIN_ROOM",
            roomRef,
            connectionManager
        }

        expect(reducer({}, action)).toEqual({
            roomRef,
            connectionManager
        })
    })
})