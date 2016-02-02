/**
 * A base mixin for redux based component
 */
import {PropTypes} from 'react'
import _ from 'lodash'

export default {
  propTypes: {
    id: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    states: PropTypes.object.isRequired
  },

  /**
   * using component id to combineReducers
   */
  getReduxStates() {
    return this.props.states[this.props.id]
  },

  /**
   * flux standard action
   * payload should be an object (if needed) to reduce chaos
   */
  dispatchAction(actionName, payload) {
    let actionHandler = this.props.actions[actionName]
    if (!actionHandler) {
      console.warn(`dispatchAction failed, this.props.actions.${actionName} is undefined`)
      return
    }

    actionHandler(_.assign({
      componentID: this.props.id
    }, payload))
  },
}
