import React from 'react'
import { shallow, mount } from 'enzyme'
import MessageBubble from '../../components/MessageBubble'
import renderer from 'react-test-renderer';


Date.now = jest.fn(() => new Date(Date.UTC(2017, 7, 9, 8)).valueOf())

describe('Component: MessageBubble', () => {
    it('should render the message bubble', () => {
        let onDownload = jest.fn()
        let item = {
            type: "text",
            body: "hello world",
            id: 123,
            isMine: false,
            timeStamp: Date.now()
        }
        const wrapper = shallow(<MessageBubble item={item} onDownload={onDownload}/>)
        expect(wrapper.find(".message-bubble-wrapper")).toHaveLength(1)
    })

    it('should match previous snapshot', () => {
        let onDownload = jest.fn()
        let item = {
            type: "text",
            body: "hello world",
            id: 123,
            isMine: false,
            timeStamp: Date.now()
        }
        const tree = renderer
            .create(<MessageBubble item={item} onDownload={onDownload} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should show links properly', () => {
        let onDownload = jest.fn()
        let item = {
            type: "text",
            body: "hello world <div class=\"xss-vulnerability\" style=\"color: red\">problem!</div> http://www.google.com",
            id: 123,
            isMine: false,
            timeStamp: Date.now()
        }
        const wrapper = mount(<MessageBubble item={item} onDownload={onDownload}/>)

        expect(wrapper.find(".message-bubble-wrapper")).toHaveLength(1)
        expect(wrapper.find(".message-bubble")).toHaveLength(1)
        expect(wrapper.find(".message-bubble-body")).toHaveLength(1)
        let messageBody = wrapper.find(".message-bubble-body").render()
        expect(messageBody.find(".xss-vulnerability")).toHaveLength(0)
        expect(messageBody.find(".message-bubble-link")).toHaveLength(1)
    })

    it('should render download links properly', () => {
        let onDownload = jest.fn()
        let item = {
            type: "file",
            body: {
                count: 1,
                filenames: ["somefile.ext"]
            },
            id: 123,
            isMine: false,
            timeStamp: Date.now()
        }

        const wrapper = mount(<MessageBubble item={item} onDownload={onDownload}/>)
        expect(wrapper.find(".file")).toHaveLength(1)
        expect(wrapper.find(".download-button")).toHaveLength(1)
        wrapper.find(".download-button").simulate('click')
        expect(onDownload).toHaveBeenCalled()
        expect(wrapper.find(".file").html().includes("Download")).toBeTruthy()
    })

    it('should render download link for multiple files', () => {
        let onDownload = jest.fn()
        let item = {
            type: "file",
            body: {
                count: 5,
                filenames: ["somefile1.ext", "somefile2.ext", "somefile3.ext", "somefile4.ext", "somefile5.ext"]
            },
            id: 123,
            isMine: false,
            timeStamp: Date.now()
        }

        const wrapper = mount(<MessageBubble item={item} onDownload={onDownload}/>)
        expect(wrapper.find(".file")).toHaveLength(1)
        expect(wrapper.find(".download-button")).toHaveLength(1)
        wrapper.find(".download-button").simulate('click')
        expect(onDownload).toHaveBeenCalled()
        expect(wrapper.find(".file").html().includes("files")).toBeTruthy()  
    })

    it('should display proper sent status', () => {
        let onDownload = jest.fn()
        let item = {
            type: "file",
            body: {
                count: 5,
                filenames: ["somefile1.ext", "somefile2.ext", "somefile3.ext", "somefile4.ext", "somefile5.ext"]
            },
            id: 123,
            isMine: true,
            timeStamp: Date.now()
        }

        const wrapper = mount(<MessageBubble item={item} onDownload={onDownload}/>)
        expect(wrapper.find(".file")).toHaveLength(1)
        expect(wrapper.find(".download-button")).toHaveLength(0)
        expect(wrapper.find(".file").html().includes("Sent")).toBeTruthy()        
    })
})