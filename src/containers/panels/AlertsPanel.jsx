import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import PropTypes from 'prop-types'
import Alert from 'reactstrap/lib/Alert'

import { hideAlert } from './../../actions/alerts'

class InfoPanel extends React.Component {

    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.dispatch(hideAlert());
    }

    render() {
        const { message, type } = this.props;

        return (<Alert
            color={type}
            isOpen={!!type}
            toggle={this.onClose}
            className="alert-notification"
        >
            {message}
        </Alert>);
    }
}

InfoPanel.propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    type: PropTypes.any,
};

const mapStateToProps = state => {
    return state.alerts || {};
};

export default connect(mapStateToProps)(InfoPanel);