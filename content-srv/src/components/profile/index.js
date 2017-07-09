import { h, Component } from 'preact';
import style from './style';

export default class Profile extends Component {
	state = {
		count: 0
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(::this.updateTime, 1000);
		this.updateTime();
		this.setUser();

		// every time we get remounted, increment a counter:
		this.setState({ count: this.state.count+1 });
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// update the current time
	updateTime() {
		let time = new Date().toLocaleString();
		this.setState({ time });
	}

	setUser() {
		let user = this.props.match.params.user || 'Me';
		this.setState({ user });
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({}, { time, count, user }) {
		return (
			<div class={style.profile}>
				<h1>Profile: { user }</h1>
				<p>This is the user profile for a user named { user }.</p>

				<div>Current time: { time }</div>
				<div>Profile route mounted { count } times.</div>
			</div>
		);
	}
}
