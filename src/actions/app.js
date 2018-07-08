export const SET_ONLINE_STATUS = 'SET_ONLINE_STATUS';

/**
 * Is app offline or online
 * @param {Boolean} status 
 */
export const setOnlineStatus = isOnline => dispatch => dispatch({
    isOnline,
    type: SET_ONLINE_STATUS,
});