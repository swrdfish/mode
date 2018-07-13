import React from 'react'
import { shallow } from 'enzyme'
import UserProfilePicture from '../../components/UserProfilePicture'
import renderer from 'react-test-renderer';

describe('Component: UserProfilePicture', () => {
    it('should render the profile picture', () => {
        const wrapper = shallow(<UserProfilePicture />);
        expect(wrapper.find(".profile-picture")).toHaveLength(1)
    })

    it('should match previous snapshot', () => {
        const tree = renderer
            .create(<UserProfilePicture />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})