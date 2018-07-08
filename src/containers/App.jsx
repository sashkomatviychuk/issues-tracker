import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import connect from 'react-redux/lib/connect/connect'

import Header from './Header';
import AlertsPanel from './panels/AlertsPanel'
import IssuesContainer from './issues/IssuesContainer';
import IssueFormModal from './modals/IssueFormModal';
import OfflineStatusPanel from './panels/OfflineStatusPanel';
import { setOnlineStatus } from './../actions/app'

class App extends React.Component {

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('online', () => {
                this.props.dispatch(setOnlineStatus(true));
            });
            
            window.addEventListener('offline', () => {
                this.props.dispatch(setOnlineStatus(false));
            });
        }
    }

    render() {
        return (
            <div className="common">
                <OfflineStatusPanel />
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
    }
}

export default connect()(App);