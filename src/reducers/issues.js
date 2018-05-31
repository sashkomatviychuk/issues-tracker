import {
    BEFORE_ISSUES_LOADED,
    ISSUES_LOADED_SUCCESS,
    ISSUES_LOADED_FAILED,
    ADD_NEW_ISSUE,
    UPDATE_ISSUE,
    REMOVE_ISSUE,
    SYNC_ISSUES,
} from './../actions/issues';

let initialState = {
    list: [],
    page: 1,
    prevLength: 0,
    isLoading: false,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case BEFORE_ISSUES_LOADED:
            return {
                ...state,
                loading: true,
            };

        case ISSUES_LOADED_SUCCESS:
            return {
                ...state,
                loading: false,
                issues: [
                    ...state.issues,
                    ...action.issues,
                ],
                prevLength: action.issues.length,
            };

        case ISSUES_LOADED_FAILED:
            return {
                ...state,
                loading: false,
            };
    }
};
