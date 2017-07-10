import { h, Component } from 'preact';
import style from './style';

import { Toolbar } from '../mdc'


export default class PodcastPost extends Component {

    /*const listItems = numbers.map((number) =>
        <li key={number.toString()}>
        {number}
        </li>
    );*/

	// gets called when this route is navigated to
	componentDidMount() {
		// every time we get remounted, increment a counter:
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
	}  

	// Note: `user` comes from the URL, courtesy of our router
	render() {
		return (
			<div class={style.profile}>
				<Toolbar 
				title="lol1"
				align-end="true">
					OK?
				</Toolbar>			
				<div>FeedPost route mounted lol.</div>
			</div>
		);
	}
}
