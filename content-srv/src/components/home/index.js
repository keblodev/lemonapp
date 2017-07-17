import { h, Component } from 'preact';
import style from './style';

import { Link } from 'react-router-dom';
import { Button } from '../mdc';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Sure feel's like Home route</h1>

				<Link
					className="mdc-list-item"
					to="/feedrizer">
					<Button
						accent
						ripple
						raised
					>
						Feedrizer
					</Button>
				</Link>
				<Link
					className="mdc-list-item"
					to="/sampleapp">
					<Button
						accent
						ripple
						raised
					>
						SampleApp
					</Button>
				</Link>
			</div>
		);
	}
}
