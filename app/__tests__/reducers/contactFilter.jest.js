import reducer from '../../reducers/contactFilter'

describe('contactFilter reducer', () => {
    it('contactFilter reducer should return initial state', () => {
        expect(reducer(undefined, {})).toEqual('')
    })

    it('should handle SET_CONTACT_FILTER', () => {
        let username = 'hello'
        let action = {
            type: "SET_CONTACT_FILTER",
            username
        }

        expect(reducer('', action)).toEqual(username)

        expect(reducer('world', action)).toEqual(username)
    })
})