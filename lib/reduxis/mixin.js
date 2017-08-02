'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A base mixin for redux based component
 */
exports.default = {
  propTypes: {
    id: _react.PropTypes.string.isRequired,
    actions: _react.PropTypes.object.isRequired,
    states: _react.PropTypes.object.isRequired
  },

  /**
   * using component id to combineReducers
   */
  getReduxStates: function getReduxStates() {
    return this.props.states[this.props.id];
  },


  /**
   * flux standard action
   * payload should be an object (if needed) to reduce chaos
   */
  dispatchAction: function dispatchAction(actionName, payload) {
    var actionHandler = this.props.actions[actionName];
    if (!actionHandler) {
      console.warn('dispatchAction failed, this.props.actions.' + actionName + ' is undefined');
      return;
    }

    actionHandler(_lodash2.default.assign({
      componentID: this.props.id
    }, payload));
  }
};