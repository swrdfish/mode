import React from 'react'
import { shallow } from 'enzyme'
import { NotificationArea } from '../../components/NotificationArea'
import renderer from 'react-test-renderer';

describe('Component: NotificationArea', () => {
    it('should render the profile picture', () => {
        const wrapper = shallow(<NotificationArea notifications={[]}/>);
        expect(wrapper.find(".notification-area")).toHaveLength(1)
    })

    it('should match previous snapshot', () => {
        const tree = renderer
            .create(<NotificationArea  notifications={[]}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})