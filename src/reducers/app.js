import { SET_ONLINE_STATUS } from '../actions/app'

const initIsOnline = (typeof navigator !== 'undefined') ? navigator.onLine : true;

let initialState = {
    isOnline: initIsOnline,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ONLINE_STATUS:
            return {
                ...state,
                isOnline: action.isOnline,
            };
        
        default:
            return state;
    }
}