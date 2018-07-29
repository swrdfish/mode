import React from 'react'
import { shallow } from 'enzyme'
import MessageViewer from '../../components/MessageViewer'
import MessageBubble from '../../components/MessageBubble'
import renderer from 'react-test-renderer';


describe('Component: MessageViewer', () => {
    it('should render the message viewer', () => {
        const wrapper = shallow(<MessageViewer />)
        expect(wrapper.find(".message-view-wrapper")).toHaveLength(1)
        expect(wrapper.find(".empty-message-view")).toHaveLength(1)
        expect(wrapper.find(".empty-message-view").text()).toEqual("select someone to chat with.")
    })

    it('should match previous snapshot', () => {
        let chatter = 123456
        const tree = renderer
            .create(<MessageViewer chatter={chatter} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should render empty chat room if no messages are present', () => {
        let chatter = 123456
        const wrapper = shallow(<MessageViewer chatter={chatter} />)
        expect(wrapper.find(".message-view-wrapper")).toHaveLength(1)
        expect(wrapper.find(".empty-message-view")).toHaveLength(1)
        expect(wrapper.find(".empty-message-view").text()).toEqual("Say something!")  
    })

    it('should render messages', () => {
        let chatter = 123456

        let item1 = {
            type: "text",
            body: "hello world",
            id: 123,
            isMine: false,
            timeStamp: Date.now()
        }

        let item = {
            type: "text",
            body: "hello world",
            id: 124,
            isMine: true,
            timeStamp: Date.now()
        }

        let messages = [item, item1]
        const wrapper = shallow(<MessageViewer chatter={ chatter } messages={ messages } />)
        expect(wrapper.find(".message-view-wrapper")).toHaveLength(1)
        expect(wrapper.find(".empty-message-view")).toHaveLength(0)
        expect(wrapper.find(".messages-scrollable")).toHaveLength(1)
        expect(wrapper.find(MessageBubble)).toHaveLength(2)
    })
})