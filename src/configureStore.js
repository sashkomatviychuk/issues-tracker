import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import issues from './reducers/issues';
import alerts from './reducers/alerts';
import modal from './reducers/modal';

module.exports = function (initialState = {}) {
    const combined = combineReducers({
        issues,
        alerts,
        modal,
    });

    return createStore(combined, initialState, applyMiddleware(thunk));
}