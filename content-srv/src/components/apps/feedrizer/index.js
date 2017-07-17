import { h, Component } from 'preact';

import style from './style';

import CoreListView from './components/corelistview';

class FeedrizerApp extends Component {
	// Note: `user` comes from the URL, courtesy of our router
	render() {
		return (
			<div class={style.frListBase}>
				<CoreListView />
			</div>
		);
	}
}

export default FeedrizerApp;