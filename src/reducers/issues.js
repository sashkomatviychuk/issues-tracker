import {
    BEFORE_ISSUES_LOADED,
    ISSUES_LOADED_SUCCESS,
    ISSUES_LOADED_FAILED,
    ADD_NEW_ISSUE,
    UPDATE_ISSUE,
    REMOVE_ISSUE,
    SYNC_ISSUES,
    ISSUES_PER_PAGE,
    APPLY_ISSUES_FILER,
} from './../actions/issues';

let initialState = {
    list: [],
    page: 1,
    prevLength: 0,
    isLoading: false,
    filter: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BEFORE_ISSUES_LOADED:
            return {
                ...state,
                isLoading: true,
            };

        case ISSUES_LOADED_SUCCESS: {
            return {
                ...state,
                loading: false,
                list: [
                    ...state.list,
                    ...action.issues,
                ],
                prevLength: action.issues.length,
            };
        }

        case ISSUES_LOADED_FAILED:
            return {
                ...state,
                isLoading: false,
            };

        case ADD_NEW_ISSUE: {
            const list = JSON.parse(JSON.stringify(state.list));

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
        }

        case UPDATE_ISSUE: {
            const list = JSON.parse(JSON.stringify(state.list));
            const { index, issue } = action;

            list[index] = issue;

            return {
                ...state,
                list,
            };
        }

        case REMOVE_ISSUE: {
            const list = JSON.parse(JSON.stringify(state.list));
            const { index } = action;

            list.splice(index, 1);

            return {
                ...state,
                list,
            };
        }

        case APPLY_ISSUES_FILER: {
            return {
                ...state,
                filter: action.filter || null,
            };
        }

        default:
            return state;
    }
};
