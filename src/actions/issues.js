import axios from 'axios'

export const BEFORE_ISSUES_LOADED = 'BEFORE_ISSUES_LOADED';
export const ISSUES_LOADED_SUCCESS = 'ISSUES_LOADED_SUCCESS';
export const ISSUES_LOADED_FAILED = 'ISSUES_LOADED_FAILED';
export const ADD_NEW_ISSUE = 'ADD_NEW_ISSUE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const REMOVE_ISSUE = 'REMOVE_ISSUE';
export const SYNC_ISSUES = 'SYNC_ISSUES';

export const ISSUES_PER_PAGE = 20;

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

/**
 *
 * @param {Object} issue
 * @returns {Object}
 */
function addIssueAction(issue) {
    return {
        action: ADD_NEW_ISSUE,
        issue,
    };
}

/**
 * @param {Number} index
 * @param {Object} issue
 * @returns {Object}
 */
function updateIssueAction(index, issue) {
    return {
        action: UPDATE_ISSUE,
        issue,
        index,
    };
}

/**
 * @param {Number} index
 * @returns {Object}
 */
function removeIssueAction(index) {
    return {
        action: REMOVE_ISSUE,
        index,
    };
}

export const fetchIssues = () => (dispatch, getStats) => {
    const state = getState();
    const issues = state.issues.list || [];
    const page = parseInt(issues.length / ISSUES_PER_PAGE) + 1;

    dispatch(beforeIssuesLoaded());

    return axios.get('/api/issues', { page })
        .then(response => {

            dispatch(issuesWasLoaded(response));

            return response;
        })
        .catch(err => dispatch(issuesLoadedFailed()));
};

export const createIssue = issue => (dispatch, getState) => {
    return axios.post('/api/issues', { issue })
        .then(response => {
            const { result } = response;

            if (result == 1) {
                dispatch(addIssueAction(issue));
            }
        })
        .catch(err => {});
};

export const updateIssue = (index, issue) => (dispatch, getState) => {
    return axios.put('/api/issue/' + issue._id, { issue })
        .then(response => {
            const { result } = response;

            if (result == 1) {
                dispatch(updateIssueAction(index, issue));
            }
        })
        .catch(err => {});
};

export const removeIssue = (index, issue) => (dispatch, getState) => {
    return axios.delete('/api/issue/' + issue._id)
        .then(response => {
            const { result } = response;

            if (result == 1) {
                dispatch(removeIssueAction(index));
            }
        })
        .catch(err => {});
};

export const syncIssues = () => (dispatch, getState) => {
    const state = getState();
    const offset = state.issues.length;
    const limit = 1;

    return axios.get('api/issues/sync', { offset, limit })
        .then(response => {
            dispatch(issuesWasLoaded(response));

            return response;
        })
        .catch(err => {});
};