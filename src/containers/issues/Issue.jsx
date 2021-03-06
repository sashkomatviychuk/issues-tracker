import React from 'react'
import Badge from 'reactstrap/lib/Badge'
import ta from 'time-ago'
import PropTypes from 'prop-types'
import connect from 'react-redux/lib/connect/connect'

import OptionsDropdown from './OptionsDropdown'

class Issue extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { issue, index } = this.props;

        return (
            <div className={`border-left-${issue.status} list-group-item list-group-item-action flex-column align-items-start`}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{issue.title}</h5>
                    <small>
                        <OptionsDropdown
                            index={index}
                            issue={issue}
                        />
                    </small>
                </div>
                <p className="mb-1">{issue.description}</p>
                <div className="d-flex w-100 justify-content-between">
                    <Badge color="info">{issue.priority}</Badge>
                    <small>{ta.ago(issue.created_at)}</small>
                </div>
            </div>
        );
    }
}

export default connect()(Issue);
