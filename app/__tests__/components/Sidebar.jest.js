import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from '../../components/Sidebar'
import renderer from 'react-test-renderer';
import UserInfoDisplay from '../../components/UserInfoDisplay'
import SearchBar from '../../components/SearchBar'
import ContactList from '../../components/ContactList'


describe('Component: Sidebar', () => {
    it('should render the sidebar properly', () => {
        const wrapper = shallow(<Sidebar />);
        expect(wrapper.find("#sidebar")).toHaveLength(1)
        expect(wrapper.find(UserInfoDisplay)).toHaveLength(1)
        expect(wrapper.find(SearchBar)).toHaveLength(1)
        expect(wrapper.find(ContactList)).toHaveLength(1)
    })
})