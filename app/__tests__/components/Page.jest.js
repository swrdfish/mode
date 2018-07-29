import React from 'react'
import { shallow } from 'enzyme'
import Page from '../../components/Page'
import renderer from 'react-test-renderer';

describe('Component: Page', () => {
    it('should render the page', () => {
        const wrapper = shallow(<Page><span>hello</span></Page>)
        expect(wrapper.find("#main-window")).toHaveLength(1)
        expect(wrapper.find('span')).toHaveLength(1)
        expect(wrapper.find('span').text()).toEqual('hello')
    })

    it('should match previous snapshot', () => {
        const tree = renderer
            .create(<Page><div>hello</div></Page>)
            .toJSON()
        expect(tree).toMatchSnapshot();
    })
})