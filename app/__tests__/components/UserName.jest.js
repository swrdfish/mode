import React from 'react'
import { shallow } from 'enzyme'
import UserName from '../../components/UserName'
import renderer from 'react-test-renderer'


describe('Component: UserName', () => {
    it('should render the user name', () => {
        const onUpdateUsername = jest.fn()
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
        expect(wrapper.find(".user-name")).toHaveLength(1)
    })

    it('should show connecting in place of username if username is undefined', () => {
        const onUpdateUsername = jest.fn()
        const wrapper = shallow(<UserName onUpdateUsername={ onUpdateUsername } />)
        expect(wrapper.find(".user-name").text()).toEqual('connecting..    ')
    })

    it('should show username properly', () => {
        const onUpdateUsername = jest.fn()
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
        expect(wrapper.find(".user-name").text()).toEqual('foobar    ') 
    })

    it('should match previous snapshot', () => {
        const onUpdateUsername = jest.fn()

        const usernameWithValidName = renderer
            .create(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
            .toJSON()
        expect(usernameWithValidName).toMatchSnapshot();
        const usernameWithUndefinedName = renderer
            .create(<UserName onUpdateUsername={ onUpdateUsername } />)
            .toJSON()
        expect(usernameWithUndefinedName).toMatchSnapshot();
    })

    it('should handle onClick event', () => {
        const onUpdateUsername = jest.fn()
        let spy = jest.spyOn(UserName.prototype, 'handleSpanOnClick')
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
        wrapper.find(".user-name").simulate('click')
        expect(spy).toHaveBeenCalled()
        expect(wrapper.type()).toEqual('input')
    })

    it('should not render input if the username is not set', () => {
        const onUpdateUsername = jest.fn()
        let spy = jest.spyOn(UserName.prototype, 'handleSpanOnClick')
        const wrapper = shallow(<UserName onUpdateUsername={ onUpdateUsername } />)
        wrapper.find(".user-name").simulate('click')
        expect(spy).toHaveBeenCalled()
        expect(wrapper.type()).toEqual('span')
    })

    it('should handle onFocus event', () => {
        const onUpdateUsername = jest.fn()
        let spy = jest.spyOn(UserName.prototype, 'moveCaretAtEnd')
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
        wrapper.find(".user-name").simulate('click')
        let mockedEvent = {target: {}}
        wrapper.find(".user-name").simulate('focus', mockedEvent)
        expect(spy).toHaveBeenCalled()
    })

    it('should handle onBlur event', () => {
        const onUpdateUsername = jest.fn()
        let spy = jest.spyOn(UserName.prototype, 'handleOnBlur')
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
        wrapper.find(".user-name").simulate('click')
        let mockedEvent = {target: {}}
        wrapper.find(".user-name").simulate('focus', mockedEvent)
        wrapper.find(".user-name").simulate('blur')        
        expect(spy).toHaveBeenCalled()
        expect(wrapper.type()).toEqual('span')
    })

    it('should handle onChange event', () => {
        const onUpdateUsername = jest.fn()
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
        wrapper.find(".user-name").simulate('click')
        let mockedEvent = {target: {value: 'cazz'}}
        wrapper.find(".user-name").simulate('change', mockedEvent)
        expect(wrapper.state().value).toEqual('cazz')
    })

    it('should handle onKeypress event', () => {
        const onUpdateUsername = jest.fn()
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
        wrapper.find(".user-name").simulate('click')
        let mockedEvent = {key: 'Enter'}
        wrapper.find(".user-name").simulate('keypress', mockedEvent)
        expect(onUpdateUsername).toHaveBeenCalled()
        expect(wrapper.type()).toEqual('span')  
    })

    it('should handle onKeypress event only for [Enter]', () => {
        const onUpdateUsername = jest.fn()
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
        wrapper.find(".user-name").simulate('click')
        let mockedEvent = {key: 'Esc'}
        wrapper.find(".user-name").simulate('keypress', mockedEvent)
        expect(onUpdateUsername).not.toHaveBeenCalled()
        expect(wrapper.type()).toEqual('input')  
    })
})