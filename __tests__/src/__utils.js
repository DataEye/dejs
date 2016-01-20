import TestUtils from 'react-addons-test-utils'

export function shallowRender(component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

export function render(component) {
  return TestUtils.renderIntoDocument(component)
}
