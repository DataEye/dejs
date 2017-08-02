'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReducer;
/**
 * This generated reducer accepts flux standard action
 * {type, payload, error, meta}
 */
function createReducer(componentID, reducer) {
  var initialState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!componentID || typeof componentID !== 'string') {
    throw new Error('Reduxis createComponentReducer needs a component id to create reducer');
  }

  if (typeof reducer !== 'function') {
    throw new Error('Reduxis createComponentReducer needs a reducer function');
  }

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var _ref = action || {};

    var meta = _ref.meta;


    if (!meta || !meta.original) {
      return state;
    }

    if (meta.original.componentID !== componentID) {
      return state;
    }

    return reducer(state, action) || state;
  };
}