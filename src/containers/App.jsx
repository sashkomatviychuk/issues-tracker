import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header';
import AlertsPanel from './panels/AlertsPanel'
import IssuesContainer from './issues/IssuesContainer';

const App = (props) => (
    <div className="container">
        <AlertsPanel />
        <Header />
        <Switch>
            <Route exact path="/" component={IssuesContainer} />
        </Switch>
    </div>
);

export default App;