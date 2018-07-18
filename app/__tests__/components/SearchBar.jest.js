import React from 'react'
import { shallow } from 'enzyme'
import { SearchBar } from '../../components/SearchBar'
import { setContactFilter } from '../../actions'
import renderer from 'react-test-renderer';

describe('Component: SearchBar', () => {
    it('should render the SearchBar properly', () => {
        const wrapper = shallow(<SearchBar />)
        expect(wrapper.find(".search-wrapper")).toHaveLength(1)
        expect(wrapper.find("input")).toHaveLength(1)
        expect(wrapper.find(".fa-search")).toHaveLength(1)
    })

    it('should match previous snapshot', () => {
        const tree = renderer
            .create(<SearchBar />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('should handle onChange event', () => {
        const dispatch = jest.fn()
        let handleOnChange = jest.spyOn(SearchBar.prototype, 'handleOnChange')
        let wrapper = shallow(<SearchBar dispatch={dispatch} />)
        wrapper.find("input").simulate('change', {target: {value: "FOO"}})
        expect(handleOnChange).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(setContactFilter("foo"))
        expect(wrapper.state().value).toEqual("FOO")
        expect(wrapper.find("input").prop('value')).toEqual("FOO")
    })

    it('should show clear button', () => {
        let wrapper = shallow(<SearchBar />)
        wrapper.setState({value: "FOO"})
        expect(wrapper.find(".clear-search")).toHaveLength(1)
    })

    it('should handle escape key', () => {
        const handleKeyDown = jest.spyOn(SearchBar.prototype, 'handleKeyDown')
        const stopPropagation = jest.fn()
        const preventDefault = jest.fn()
        const dispatch = jest.fn()
        const event = {
            key: 'Escape',
            stopPropagation,
            preventDefault
        }
        let wrapper = shallow(<SearchBar dispatch={dispatch} />)
        wrapper.setState({value: "FOO"})
        wrapper.find("input").simulate('keydown', event)
        expect(handleKeyDown).toHaveBeenCalled()
        expect(stopPropagation).toHaveBeenCalled()
        expect(preventDefault).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(setContactFilter(''))
        expect(wrapper.state().value).toEqual('')
    })

    it('should handle escape key only', () => {
        const handleKeyDown = jest.spyOn(SearchBar.prototype, 'handleKeyDown')
        const stopPropagation = jest.fn()
        const preventDefault = jest.fn()
        const dispatch = jest.fn()
        const event = {
            key: 'h',
            stopPropagation,
            preventDefault
        }
        let wrapper = shallow(<SearchBar dispatch={dispatch} />)
        wrapper.setState({value: "FOO"})
        wrapper.find("input").simulate('keydown', event)
        expect(handleKeyDown).toHaveBeenCalled()
        expect(stopPropagation).not.toHaveBeenCalled()
        expect(preventDefault).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalledWith()
        expect(wrapper.state().value).toEqual('FOO')
    })

    it('should handle clear search', () => {
        const handleClearSearch = jest.spyOn(SearchBar.prototype, 'handleClearSearch')
        const dispatch = jest.fn()
        let wrapper = shallow(<SearchBar dispatch={dispatch} />)
        wrapper.setState({value: "FOO"})
        wrapper.find(".clear-search").simulate('click')
        expect(handleClearSearch).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(setContactFilter(''))
        expect(wrapper.state().value).toEqual('')
        expect(wrapper.find('.fa-search')).toHaveLength(1)  
    })
})