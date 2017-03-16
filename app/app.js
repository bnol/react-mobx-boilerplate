/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill';

/* eslint-disable import/no-unresolved, import/extensions */
// Load the manifest.json file and the .htaccess file
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { runInAction } from 'mobx';
import { AppContainer } from 'react-hot-loader';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'mobx-react-router';
import { useScroll } from 'react-router-scroll';
import App from 'containers/App';
import LanguageProvider from 'containers/LanguageProvider';
import configureStore, { routerStore } from './stores';
import createRoutes from './routes';

// Import i18n messages
import { translationMessages } from './i18n';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
// import 'sanitize.css/sanitize.css';
import './global-styles';

const stores = configureStore();

// Sync history and store
const history = syncHistoryWithStore(browserHistory, routerStore);

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(stores),
};

const render = (translatedMessages) => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...stores} suppressChangedStoreWarning>
        <div>
          <LanguageProvider messages={translatedMessages}>
            <Router
              history={history}
              routes={rootRoute}
              render={// Scroll to top when going to a new page, imitating default browser
              // behaviour
              applyRouterMiddleware(useScroll())}
            />
          </LanguageProvider>
          {process.env.NODE_ENV === 'development' && <DevTools />}
        </div>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', './routes', './containers/App'], () => {
    render(translationMessages);
  });

  module.hot.accept('./stores', () => {
    import('./stores').then((newStores) => {
      const hmrStores = newStores.default();
      runInAction('hot-reload', () => {
        Object.keys(stores).forEach((key) => {
          if (typeof hmrStores[key] !== 'undefined') {
            Object.assign(hmrStores[key], stores[key]);
          }
        });
      });
      Object.assign(stores, hmrStores);
      render(translationMessages);
    });
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/vi.js'),
      ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
