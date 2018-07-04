import reducer from '../../reducers/userList'

describe('userList reducer', () => {
    it('userList reducer should return initial state', () => {
        expect(reducer(undefined, {})).toEqual([])
    })
})