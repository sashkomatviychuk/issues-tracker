import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import issues from './reducers/issues';
import alerts from './reducers/alerts';

module.exports = function (initialState = {}) {
    const combined = combineReducers({
        issues,
        alerts,
    });

    return createStore(combined, initialState, applyMiddleware(thunk));
}