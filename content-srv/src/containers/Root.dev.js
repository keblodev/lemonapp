import { h, Component } from 'preact';
import { Provider } from 'react-redux';
import App from '../components/app';
import DevTools from './DevTools';

import { ConnectedRouter, push } from 'react-router-redux'

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <App />
            {/*<DevTools />*/}
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
