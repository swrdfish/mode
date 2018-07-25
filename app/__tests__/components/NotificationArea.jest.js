import React from 'react'
import { shallow } from 'enzyme'
import { NotificationArea } from '../../components/NotificationArea'
import renderer from 'react-test-renderer'

describe('Component: NotificationArea', () => {
    it('should render the profile picture', () => {
        const wrapper = shallow(<NotificationArea notifications={[]}/>)
        expect(wrapper.find(".notification-area")).toHaveLength(1)
    })

    it('should match previous snapshot', () => {
        let notifications = [
            {
                type: "info",
                message: "hello"
            },
            {
                type: 'error',
                message: "ai hazard"
            }
        ]
        const tree = renderer
            .create(<NotificationArea  notifications={notifications}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('should display all notifications', () => {
        let notifications = [
            {
                type: "info",
                message: "hello"
            },
            {
                type: 'error',
                message: "ai hazard"
            }
        ]

        const wrapper = shallow(<NotificationArea notifications={notifications}/>)
        expect(wrapper.find(".notification")).toHaveLength(2)
    })

    it('should have a working clear notification button', () => {
        let notifications = [
            {
                type: "info",
                message: "hello"
            },
            {
                type: 'error',
                message: "ai hazard"
            }
        ]
        let spy = jest.spyOn(NotificationArea.prototype, 'handleClearNotification')
        let dispatch = jest.fn()
        const wrapper = shallow(<NotificationArea notifications={notifications} dispatch={dispatch} />)
        let event = {target: {
            getAttribute(){
                return 25
            }
        }}
        wrapper.find(".clear-notification").first().simulate('click', event)
        expect(spy).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith({
            type: 'DEL_NOTIFICATION',
            index: 25
        })
    })
})