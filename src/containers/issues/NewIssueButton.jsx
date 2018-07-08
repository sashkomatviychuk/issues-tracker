import React from 'react'
import Button from 'reactstrap/lib/Button'
import connect from 'react-redux/lib/connect/connect'

import { showModal } from './../../actions/modal'

class NewIssueButton extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.dispatch(showModal());
    }

    render() {
        const { isOnline } = this.props;

        return (
            <Button
                className="flex-grow-1 flex-sm-grow-0 button-row"
                color="primary"
                size="sm"
                onClick={this.onClick}
                disabled={!isOnline}
            >
                New Issue
            </Button>
        );
    }
}

const mapStateToProps = state => state.app;

export default connect(mapStateToProps)(NewIssueButton);