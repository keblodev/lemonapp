import { h, Component } from 'preact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './style';

import AppActions from '../../actions';

import { Toolbar, Button, Card } from '../mdc';

class Header extends Component {

	openMenu() {
		this.props.actions.openAppShellMenuAction(true);
	}

	render() {
		return (
			<Toolbar className={style.header}>
				<Toolbar.Row>
					<Toolbar.Section align-start={true}>
						<Toolbar.Icon
							onClick={::this.openMenu}>
							menu
						</Toolbar.Icon>
						<Toolbar.Title>LemonApp shell</Toolbar.Title>
					</Toolbar.Section>
				</Toolbar.Row>
			</Toolbar>
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