import { SHOW_MODAL, HIDE_MODAL } from './../actions/modal';

let initialState = {
    issue: null,
    issueIndex: -1,
    isOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isOpen: true,
                issue: action.issue || null,
                issueIndex: action.issueIndex,
            };

        case HIDE_MODAL:
            return {
                ...state,
                isOpen: false,
                issue: null,
                issueIndex: -1,
            };

        default:
            return state;
    }
}