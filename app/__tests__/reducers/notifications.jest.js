import reducer from '../../reducers/notifications'

describe('notifications reducer', () => {
    it('notifications reducer should return initial state', () => {
        expect(reducer(undefined, {})).toEqual([])
    })

    it('should handle ADD_NOTIFICATION', () => {
        let message = 'hello'
        let notificationType = 'error'

        let action = {
            type: "ADD_NOTIFICATION",
            notificationType,
            message
        }

        let msg1 = {
            type: notificationType,
            msg: message
        }

        let msg2 = {
            type: 'info',
            msg: 'world'
        }
        expect(reducer([], action)).toEqual([msg1])

        expect(reducer([msg2], action)).toEqual([msg2, msg1])

    })

    it('should handle DEL_NOTIFICATION', () => {
        let message = 'hello'
        let notificationType = 'error'

        let action = {
            type: "DEL_NOTIFICATION",
            index: 0
        }

        let msg1 = {
            type: notificationType,
            msg: message
        }

        let msg2 = {
            type: 'info',
            msg: 'world'
        }
        expect(reducer([], action)).toEqual([])

        expect(reducer([msg2, msg1], action)).toEqual([msg1])

    })

})