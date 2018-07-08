import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import PropTypes from 'prop-types'
import Alert from 'reactstrap/lib/Alert'

class OfflineStatusPanel extends React.Component {

    render() {
        const { isOnline } = this.props;

        if (isOnline) {
            return null;
        }

        return (
            <Alert color="info" isOpen={true}>
                Application goes offline
            </Alert>
        );
    }
}

OfflineStatusPanel.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isOnline: PropTypes.bool,
};

const mapStateToProps = state => {
    return state.app || {};
};

export default connect(mapStateToProps)(OfflineStatusPanel);
