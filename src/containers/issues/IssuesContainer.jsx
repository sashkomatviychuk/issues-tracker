import React from 'react'

import IssuesStats from './IssuesStats';
import IssuesFilter from './IssuesFilter';
import NewIssueButton from './NewIssueButton';
import IssuesList from './IssuesList';

class IssuesContainer extends React.Component {

    render() {
        return (
            <div>
                <IssuesStats />
                <div className="d-flex w-100 justify-content-between mt-30">
                    <IssuesFilter />
                    <NewIssueButton />
                </div>
                <div className="mt-30">
                    <IssuesList />
                </div>
            </div>
        );
    }
}

export default IssuesContainer;