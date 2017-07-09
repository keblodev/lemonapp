import { h, Component, render } from 'preact';
import { Provider } from 'react-redux';
import App from '../components/app';

import { ConnectedRouter, push } from 'react-router-redux'

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
      </Provider>
    );
  }
}
