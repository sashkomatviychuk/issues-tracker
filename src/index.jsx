import React from 'react'
import ReactDOM from 'react-dom'
import Provider from 'react-redux/lib/components/Provider'
import BrowserRouter from 'react-router-dom/BrowserRouter'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/index.css'
import App from 'containers/App'
import configureStore from 'configureStore'

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

const render = Component => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <Component />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

render(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NewApp = require('containers/App').default;
        render(NewApp);
	});
}