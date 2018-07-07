import React from 'react'
import PullRefresh from 'react-pullrefresh'

import IssuesStats from './IssuesStats';
import IssuesFilter from './IssuesFilter';
import NewIssueButton from './NewIssueButton';
import IssuesList from './IssuesList';

class IssuesContainer extends React.Component {

    constructor(props) {
        super(props);

        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh() {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }

    render() {
        return (
            <PullRefresh onRefresh={this.handleRefresh}>
                <div>
                    <IssuesStats />
                    <div className="d-flex w-100 justify-content-between mt-30 flex-wrap">
                        <IssuesFilter />
                        <NewIssueButton />
                    </div>
                    <div className="mt-30">
                        <IssuesList />
                    </div>
                </div>
            </PullRefresh>
        );
    }
}

export default IssuesContainer;