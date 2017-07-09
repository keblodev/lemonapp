import { h, Component } from 'preact';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './style';

import * as AppActions from '../../actions';

class Header extends Component {	

	someAction() {
		this.props.actions.appShellLevelTestAction("AA test from app");
	}

	render() {
		return (
			<header class={style.header}>
				Weird
				<h1>LemonApp shell</h1>
				<button onCLick={::this.someAction}/>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/feedrizer">Feedrizer</Link>
					<Link to="/sampleapp">SampleApp</Link>
					<Link to="/profile">Me</Link>
					<Link to="/profile/john">John</Link>
				</nav>
			</header>
		);
	}
}

function mapState(state) {
  return {  
	  someState: {1:2}
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Header);