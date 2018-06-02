import { UPDATE_STATS } from './../actions/stats';

let initialState = {
    stats: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STATS:
            return {
                ...state,
                stats: action.stats,
            };

        default:
            return state;
    }
};