import { SHOW_ALERT, HIDE_ALERT } from './../actions/alerts';

let initialState = {
    message: '',
    type: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message: action.message,
                type: action.style,
            };

        case HIDE_ALERT:
            return {
                ...state,
                message: '',
                type: null,
            };

        default:
            return state;
    }
}