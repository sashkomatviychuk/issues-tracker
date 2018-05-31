const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router');

const configureStore = require('./../../src/configureStore');
const App = require('./../../src/containers/App').default;

module.exports = (req, res) => {
    const initialState = {};
    const context = {};
    const store = configureStore(initialState);

    const appMarkup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>
    );

    if (context.url) {
        return res.redirect(301, context.url);
    }

    const state = store.getState();

    return res.render('index', { state, appMarkup });
};
