import { h, Component } from 'preact';
import Async from 'react-code-splitting';
import { Route, Switch } from 'react-router-dom';

import Header from './header';
import SideMenu from './sidemenu';
import Home from './home';

import GqlAppShellTestList from './graphQlonAppShellTest';

const SampleApp = () => <Async load={import('./apps/sampleapp')} />;
const FeedrizerApp = () => <Async load={import('./apps/feedrizer')} />;

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<SideMenu />
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/sampleapp" component={SampleApp}/>
					<Route path="/feedrizer" component={FeedrizerApp}/>
				</Switch>
				<GqlAppShellTestList />
			</div>
		);
	}
}
