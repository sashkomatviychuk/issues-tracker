import React from 'react'
import { Badge, Button } from 'reactstrap'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { showModal, hideModal } from './../../actions/modal'
import { removeIssue } from './../../actions/issues'

class Issue extends React.Component {

    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onEdit(e) {
        const { issue, index } = this.props;

        if (e.target.id == 'rmBtn') {
            return false;
        }

        this.props.dispatch(showModal(issue, index));
    }

    onRemove() {
        const { issue, index } = this.props;

        if (confirm('Remove this issue?')) {
            this.props.dispatch(removeIssue(index, issue));
        }
    }

    render() {
        const { issue } = this.props;

        return (
            <div onClick={this.onEdit} className={`border-left-${issue.status} list-group-item list-group-item-action flex-column align-items-start`}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{issue.title}</h5>
                    <small><Badge
                        color="danger"
                        className="rm-btn"
                        size="sm"
                        onClick={this.onRemove}
                        id="rmBtn"
                        >&times;</Badge>
                    </small>
                </div>
                <p className="mb-1">{issue.description}</p>
                <div className="d-flex w-100 justify-content-between">
                    <Badge color="info">{issue.priority}</Badge>
                    <small>{moment(issue.created_at).fromNow()}</small>
                </div>
            </div>
        );
    }
}

export default connect()(Issue);
