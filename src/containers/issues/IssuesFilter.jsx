import React from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { applyIssuesFilter } from './../../actions/issues'

const filterList = [
    {
        label: 'All',
        status: null,
        color: 'secondary',
    },
    {
        label: 'Open',
        status: 'open',
        color: 'primary',
    },
    {
        label: 'Pending',
        status: 'pending',
        color: 'warning',
    },
    {
        label: 'Closed',
        status: 'closed',
        color: 'success',
    },
];

class IssuesFilter extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick(filter) {
        this.props.dispatch(applyIssuesFilter(filter));
    }

    render() {
        const filterStatus = this.props.filter;

        const content = filterList.map(filter => <Button
            color={filter.color}
            size="sm"
            active={filter.status == filterStatus}
            filter={filter.status}
            onClick={this.onClick.bind(this, filter.status)}
            key={filter.label}
        >
            {filter.label}
        </Button>);

        return (
            <ButtonGroup>
                {content}
            </ButtonGroup>
        );
    }
}

IssuesFilter.propTypes = {
    dispatch: PropTypes.func.isRequired,
    filter: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        filter: state.issues.filter || null,
    };
};

export default connect(mapStateToProps)(IssuesFilter);