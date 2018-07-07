import axios from 'axios'

export const UPDATE_STATS = 'UPDATE_STATS';

function updateStats(stats = []) {
    return {
        stats,
        type: UPDATE_STATS,
    };
}

export const fetchStats = () => (dispatch, getState) => {
    return axios.get('api/issues/stats', {})
        .then(response => {
            const { result, stats } = response.data;

            if (result) {
                dispatch(updateStats(stats));
            }

            return response;
        })
        .catch(err => {
            const cacheName = `${window.location.origin}/api/issues/stats`;

            caches.match(cacheName).then(function(response) {
                if (response) {
                    response.json().then(function updateFromCache(json) {
                        dispatch(updateStats(json.stats));    
                    });
                }
            });
        });
};