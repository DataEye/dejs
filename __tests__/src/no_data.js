import React from 'react'
import TestUtils from 'react-addons-test-utils'
import * as libUtils from './__utils'
import NoData, {DEFAULT_TIP} from '../../src/no-data'

describe('lib/no-data', () => {
  it('should render default text', () => {
    let component = libUtils.shallowRender(<NoData />)
    expect(component.props.children[1]).toEqual(<div>{DEFAULT_TIP}</div>)
  })

  it('should render with my custom text and will never update', () => {
    let text = 'Sorry, no data found.'
    const renderer = TestUtils.createRenderer()
    let props = {text}
    renderer.render(<NoData {...props} />)
    let component = renderer.getRenderOutput()
    expect(component.props.children[1]).toEqual(<div>{text}</div>)

    props.text = 'modified'
    renderer.render(<NoData {...props} />)
    component = renderer.getRenderOutput()
    expect(component.props.children[1]).toEqual(<div>{text}</div>)
  })
})
