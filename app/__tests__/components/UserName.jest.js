import React from 'react'
import { shallow } from 'enzyme'
import UserName from '../../components/UserName'
import renderer from 'react-test-renderer';


describe('Component: UserName', () => {
    it('should render the user name', () => {
        const onUpdateUsername = jest.fn()
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />);
        expect(wrapper.find(".user-name")).toHaveLength(1)
    })

    it('should show connecting in place of username if username is undefined', () => {
        const onUpdateUsername = jest.fn()
        const wrapper = shallow(<UserName onUpdateUsername={ onUpdateUsername } />);
        expect(wrapper.find(".user-name").text()).toEqual('connecting..    ')
    })

    it('should show username properly', () => {
        const onUpdateUsername = jest.fn()
        const wrapper = shallow(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />);
        expect(wrapper.find(".user-name").text()).toEqual('foobar    ') 
    })

    it('should match previous snapshot', () => {
        const onUpdateUsername = jest.fn()

        const usernameWithValidName = renderer
            .create(<UserName value="foobar" onUpdateUsername={ onUpdateUsername } />)
            .toJSON();
        expect(usernameWithUndefinedName).toMatchSnapshot();
        const usernameWithUndefinedName = renderer
            .create(<UserName onUpdateUsername={ onUpdateUsername } />)
    })
})