import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import issues from './reducers/issues';
import alerts from './reducers/alerts';
import modal from './reducers/modal';
import stats from './reducers/stats';
import app from './reducers/app';

module.exports = function (initialState = {}) {
    const combined = combineReducers({
        issues,
        alerts,
        modal,
        stats,
        app,
    });

    return createStore(combined, initialState, applyMiddleware(thunk));
}