import createComponentReducer from './createReducer'
import mixin from './mixin'

/**
 * utils method, avoid duplicated code
 * return an object with state key, not a function
 */
function batchCreateReducers(ids, reducer, state) {
  let ret = {}
  return ids.reduce((prev, current) => {
    prev[current] = createComponentReducer(current, reducer, state)
    return prev
  }, ret)
}

export default {
  createComponentReducer,
  batchCreateReducers,
  mixin
}
