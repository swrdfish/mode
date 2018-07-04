import reducer from '../../reducers/files'

describe('files reducer', () => {
    it('files reducer should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should handle ADD_FILE', () => {
        let files = {
            name: 'yo.jpg',
            size: 2048
        }

        let action = {
            type: "ADD_FILE",
            id: 1,
            files
        }

        expect(reducer({}, action)).toEqual({
            '1': files 
        })

        action.id = 3
        expect(reducer({'1': files}, action)).toEqual({
            '1': files,
            '3': files
        })
    })
})