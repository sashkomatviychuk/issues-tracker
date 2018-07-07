import axios from 'axios'

import { fetchStats } from './stats';
import { hideModal } from './modal'
import { showInfo, showError } from './alerts'

export const BEFORE_ISSUES_LOADED = 'BEFORE_ISSUES_LOADED';
export const ISSUES_LOADED_SUCCESS = 'ISSUES_LOADED_SUCCESS';
export const ISSUES_LOADED_FAILED = 'ISSUES_LOADED_FAILED';
export const ADD_NEW_ISSUE = 'ADD_NEW_ISSUE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const REMOVE_ISSUE = 'REMOVE_ISSUE';
export const SYNC_ISSUES = 'SYNC_ISSUES';
export const APPLY_ISSUES_FILER = 'APPLY_ISSUES_FILER';

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
    const { result, issues } = response.data;
    let actionData = {
        loading: false,
    };

    if (result == 1) {
        actionData = Object.assign({}, actionData, {
            type: ISSUES_LOADED_SUCCESS,
            issues,
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
        type: ADD_NEW_ISSUE,
        issue: {
            ...issue,
            created_at: Date.now(),
        },
    };
}

/**
 * @param {Number} index
 * @param {Object} issue
 * @returns {Object}
 */
function updateIssueAction(index, issue) {
    return {
        type: UPDATE_ISSUE,
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
        type: REMOVE_ISSUE,
        index,
    };
}

export const fetchIssues = () => (dispatch, getState) => {
    const state = getState();
    const issues = state.issues.list || [];
    const page = parseInt(issues.length / ISSUES_PER_PAGE) + 1;

    dispatch(beforeIssuesLoaded());

    return axios.get('/api/issues', { params: { page } })
        .then(response => {

            dispatch(issuesWasLoaded(response));

            return response;
        })
        .catch(err => {
            const cacheName = `${window.location.origin}/api/issues?page=${page}`;

            caches.match(cacheName).then(function(response) {
                if (response) {
                    response.json().then(function updateFromCache(json) {
                        dispatch(issuesWasLoaded({ data: json }));    
                    });
                } else {
                    dispatch(issuesLoadedFailed());
                }

                dispatch(showError('Error occured during fetching'));
            });
        });
};

export const createIssue = issue => (dispatch, getState) => {
    return axios.post('/api/issues', { ...issue })
        .then(response => {
            const { result, error, _id } = response.data;

            if (result == 1) {
                dispatch(addIssueAction({
                    ...issue,
                    _id,
                }));

                dispatch(fetchStats());
                dispatch(hideModal());
            } else if (error) {
                dispatch(showError(error));
            }
        })
        .catch(err => {
            dispatch(showError('Error occured during creating. Try again'));
        });
};

export const updateIssue = (index, issue) => (dispatch, getState) => {
    return axios.put('/api/issue/' + issue._id, { ...issue })
        .then(response => {
            const { result, error } = response.data;

            if (result == 1) {
                dispatch(updateIssueAction(index, issue));
                dispatch(fetchStats());
                dispatch(hideModal());
            } else if (error) {
                dispatch(showError(error));
            }
        })
        .catch(err => {
            dispatch(showError('Error occured during updating. Try again'));
        });
};

export const removeIssue = (index, issue) => (dispatch, getState) => {
    return axios.delete('/api/issue/' + issue._id)
        .then(response => {
            const { result } = response.data;

            if (result == 1) {
                dispatch(removeIssueAction(index));
                dispatch(fetchStats());
                dispatch(syncIssues());
            } else {
                dispatch(showError('Error occured during deleting'));
            }
        })
        .catch(err => {
            dispatch(showError('Error occured during deleting'));
        });
};

export const syncIssues = () => (dispatch, getState) => {
    const state = getState();
    const offset = state.issues.list.length;
    const limit = 1;

    return axios.get('api/issues/sync', { params: {offset, limit} })
        .then(response => {
            dispatch(issuesWasLoaded(response));

            return response;
        })
        .catch(err => {});
};

export const applyIssuesFilter = (filter = null) => {
    return {
        filter,
        type: APPLY_ISSUES_FILER,
    };
};