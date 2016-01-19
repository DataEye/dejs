/**
 * This generated reducer accepts flux standard action
 * {type, payload, error, meta}
 */
export default function createReducer(componentID, reducer, initialState = {}) {
  if (!componentID || typeof componentID !== 'string') {
    throw new Error(`Reduxis createComponentReducer needs a component id to create reducer`)
  }

  if (typeof reducer !== 'function') {
    throw new Error(`Reduxis createComponentReducer needs a reducer function`)
  }

  return function(state = initialState, action) {
    let {meta} = action || {}

    if (!meta || !meta.original) {
      return state
    }

    if (meta.original.componentID !== componentID) {
      return state
    }

    return reducer(state, action) || state
  }
}
