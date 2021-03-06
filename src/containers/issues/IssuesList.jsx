import React from 'react'
import Button from 'reactstrap/lib/Button'
import PropTypes from 'prop-types'
import connect from 'react-redux/lib/connect/connect'

import { fetchIssues, ISSUES_PER_PAGE } from './../../actions/issues'
import Issue from './Issue';

class IssuesList extends React.Component {

    constructor(props) {
        super(props);

        this.onLoadMore = this.onLoadMore.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchIssues());
    }

    onLoadMore() {
        this.props.dispatch(fetchIssues());
    }

    render() {
        let issues = this.props.list || [];
        const showLoadMore = this.props.prevLength === ISSUES_PER_PAGE;
        const filter = this.props.filter;

        if (filter) {
            issues = issues.filter(el => el.status === filter);
        }

        const content = issues.map((item, i) => <Issue issue={item} index={i} key={i}/>);

        return (
            <div>
                <div className="list-group">
                    {content.length ? content : <span className="text-center">Issues list is empty</span>}
                </div>
                {showLoadMore && <div className="text-center mt-30">
                    <Button color="link" onClick={this.onLoadMore} >Load more</Button>
                </div>}
            </div>
        );
    }
}

IssuesList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    list: PropTypes.array,
    prevLength: PropTypes.number,
    isLoading: PropTypes.bool,
    filter: PropTypes.string,
};

const mapStateToProps = state => {
    return state.issues;
};

export default connect(mapStateToProps)(IssuesList);