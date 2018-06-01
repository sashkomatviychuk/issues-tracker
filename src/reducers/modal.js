import { SHOW_MODAL, HIDE_MODAL } from './../actions/modal';

let initialState = {
    issue: null,
    isOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isOpen: true,
                issue: action.issue || null,
            };

        case HIDE_MODAL:
            return {
                ...state,
                isOpen: false,
                issue: null,
            };

        default:
            return state;
    }
}