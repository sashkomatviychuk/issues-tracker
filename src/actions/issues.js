import axios from 'axios'

export const BEFORE_ISSUES_LOADED = 'BEFORE_ISSUES_LOADED';
export const ISSUES_LOADED_SUCCESS = 'ISSUES_LOADED_SUCCESS';
export const ISSUES_LOADED_FAILED = 'ISSUES_LOADED_FAILED';
export const ADD_NEW_ISSUE = 'ADD_NEW_ISSUE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const REMOVE_ISSUE = 'REMOVE_ISSUE';
export const SYNC_ISSUES = 'SYNC_ISSUES';

/**
 * Get params for action that runs before issues data will fetched
 * @returns {Object}
 */
function beforeIssuesLoaded() {
    return {
        type: BEFORE_ISSUES_LOADED,
        loading: true,
    };
}

/**
 * Get params for action that runs after failed issues fetching
 * @returns {Object}
 */
function issuesLoadedFailed() {
    return {
        type: ISSUES_LOADED_FAILED,
        loading: false,
    };
}

/**
 * Get action params that will dispatch after data fetching
 * @param {Object} response
 * @returns {Object}
 */
function issuesWasLoaded(response) {
    const { result, data } = response;
    let actionData = {
        loading: false,
    };

    if (result == 1) {
        actionData = Object.assign({}, actionData, {
            type: ISSUES_LOADED_SUCCESS,
            issues: data,
        });
    } else {
        actionData = Object.assign({}, actionData, {
            type: ISSUES_LOADED_FAILED,
        });
    }

    return actionData;
}

export const fetchIssues = () => (dispatch, getStats) => {
    const state = getState();
    let page = state.issues.page || 1;

    dispatch(beforeIssuesLoaded());

    return axios.get('/api/issues', { page })
        .then(response => {
            const data = response.data || [];

            dispatch(issuesWasLoaded(response));

            return response;
        })
        .catch(err => dispatch(issuesLoadedFailed()));
};