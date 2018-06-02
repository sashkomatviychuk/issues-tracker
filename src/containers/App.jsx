import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header';
import AlertsPanel from './panels/AlertsPanel'
import IssuesContainer from './issues/IssuesContainer';
import IssueFormModal from './modals/IssueFormModal';

const App = (props) => (
    <div className="common">
        <AlertsPanel />
        <IssueFormModal />
        <div className="header mx-auto text-center">
            <Header />
        </div>
        <div className="container">
            <Switch>
                <Route exact path="/" component={IssuesContainer} />
            </Switch>
        </div>
    </div>
);

export default App;