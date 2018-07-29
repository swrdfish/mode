import React from 'react'
import { shallow } from 'enzyme'
import { MessageArea } from '../../components/MessageArea'
import renderer from 'react-test-renderer';


Date.now = jest.fn(() => new Date(Date.UTC(2017, 7, 9, 8)).valueOf())

describe('Component: MessageArea', () => {
    it('should render the profile picture', () => {
        let chatArea = {uid: 123456}
        let messages = {
            '123456': [{
                type: 'text',
                timeStamp: Date.now(),
                id: 123
            }] 
        }
        const wrapper = shallow(<MessageArea chatArea={chatArea} messages={messages}/>);
        expect(wrapper.find("#message-area")).toHaveLength(1)
    })

    it('should match previous snapshot', () => {
        let chatArea = {uid: 123456}
        let messages = {
            '123456': [{
                type: 'text',
                timeStamp: Date.now(),
                id: 123
            }] 
        }
        const tree = renderer
            .create(<MessageArea chatArea={chatArea} messages={messages}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})