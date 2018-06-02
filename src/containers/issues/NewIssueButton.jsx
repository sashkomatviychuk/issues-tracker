import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux';

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
            <Button color="primary" size="sm" onClick={this.onClick}>New Issue</Button>
        );
    }
}

export default connect()(NewIssueButton);