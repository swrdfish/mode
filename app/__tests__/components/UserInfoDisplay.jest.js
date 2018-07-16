import React from 'react'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import { UserInfoDisplay } from '../../components/UserInfoDisplay'
import UserProfilePicture from '../../components/UserProfilePicture'
import { setUsername } from '../../actions'

describe('Component: UserInfoDisplay', () => {
    it('should render the component properly', () => {
        const auth = {
            username: 'foobar',
            uid: 1234,
            localIP: '127.0.0.1'
        }
        const wrapper = shallow(<UserInfoDisplay auth={auth} />);
        expect(wrapper.find(".user-info-wrapper")).toHaveLength(1)
        expect(wrapper.find(UserProfilePicture)).toHaveLength(1)
        expect(wrapper.find("span")).toHaveLength(1)
        expect(wrapper.find("UserName")).toHaveLength(1)
    })

    it('should match previous snapshot', () => {
        const auth = {
            username: 'foobar',
            uid: 1234,
            localIP: '127.0.0.1'
        }
        const tree = renderer
            .create(<UserInfoDisplay auth={auth} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should handle onUpdateUsername properly', () => {
        const auth = {
            username: 'foobar',
            uid: 1234,
            localIP: '127.0.0.1'
        }

        let setFn = jest.fn()
        let userRef = {
            child(id){
                return {
                    set: setFn
                }
            }
        }

        let usersRef = {
            child(id){
                return userRef
            }
        }

        let room = {
            roomRef: {
                child(id){
                    return usersRef
                }
            }
        }

        let dispatch = jest.fn() 
        const wrapper = shallow(<UserInfoDisplay auth={auth} room={room} dispatch={dispatch} />);
        UserInfoDisplay.prototype.onUpdateUsername.call(wrapper.instance(), 'foobar')
        expect(setFn).toHaveBeenCalledWith('foobar')
        expect(dispatch).toHaveBeenCalledWith(setUsername('foobar'))
    })
})