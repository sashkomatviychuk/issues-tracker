import {
    BEFORE_ISSUES_LOADED,
    ISSUES_LOADED_SUCCESS,
    ISSUES_LOADED_FAILED,
    ADD_NEW_ISSUE,
    UPDATE_ISSUE,
    REMOVE_ISSUE,
    SYNC_ISSUES,
    ISSUES_PER_PAGE,
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
                list: [
                    ...state.list,
                    ...action.issues,
                ],
                prevLength: action.issues.length,
            };

        case ISSUES_LOADED_FAILED:
            return {
                ...state,
                loading: false,
            };

        case ADD_NEW_ISSUE:
            const { list } = state;

            // add new issue to the top of list
            list.unshift(action.issue);

            // remove last element if needed
            if (list.length > ISSUES_PER_PAGE) {
                list.pop();
            }

            return {
                ...state,
                list,
            };

        case UPDATE_ISSUE:
            const { list } = state;
            const { index, issue } = action;

            list[i] = issue;

            return {
                ...state,
                list,
            };
    }
};
