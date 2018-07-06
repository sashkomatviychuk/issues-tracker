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
        return (
            <Button
                className="flex-grow-1 flex-sm-grow-0 button-row"
                color="primary"
                size="sm"
                onClick={this.onClick}
            >
                New Issue
            </Button>
        );
    }
}

export default connect()(NewIssueButton);