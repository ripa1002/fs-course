import React from 'react'
import { shallow } from 'enzyme'
import foo from 'enzyme-matchers'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'
import Togglable from './Togglable'

describe('<Togglable />', () => {
    let togglableComponent

    beforeEach(() => {
        togglableComponent = shallow(
            <Togglable buttonLabel="show...">
                <div class="testDiv" />
            </Togglable>
        )
    })

    it('render children', () => {
        expect(togglableComponent.contains(<div class="testDiv" />)).toEqual(true)
    })

    it('children are not displayed at start', () => {
        const div = togglableComponent.find('.togglableContent')
        expect(div.getElement().props.style).toEqual({ display: 'none' })
    })

    it('children are displayed after clicking button', () => {
        const button = togglableComponent.find('button')
        button.at(0).simulate('click')
        const div = togglableComponent.find('.togglableContent')
        expect(div.getElement().props.style).toEqual({ display: '' })
    })

})