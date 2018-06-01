export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

// show modal window
export const showModal = issue => {
    return {
        issue,
        type: SHOW_MODAL,
    }
};
// hide modal window
export const hideModal = () => {
    return {
        type: HIDE_MODAL,
    };
}