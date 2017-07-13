import { h, Component } from 'preact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer } from '../mdc';

import style from './style';

import AppActions from '../../actions';

import {
	APP_SHELL_OPEN_MENU,
	APP_SHELL_CLOSE_MENU,
	NONE } from '../../statics/constants/ActionTypes';

class SideMenu extends Component {

	handleClose() {
		this.props.actions.closeAppShellMenuAction();
	}

	componentWillUpdate({menuNavigationEvent}) {
		if (menuNavigationEvent.type === APP_SHELL_OPEN_MENU) {
			this.drawer.MDComponent.open = true;
		}

		if (menuNavigationEvent.type === APP_SHELL_CLOSE_MENU) {
			this.drawer.MDComponent.open = false;
		}
	}

	shouldComponentUpdate = (({menuNavigationEvent}) =>
			menuNavigationEvent.type === APP_SHELL_OPEN_MENU ||
			menuNavigationEvent.type === APP_SHELL_CLOSE_MENU
			);

	render({menuNavigationEvent}) {
		return (
		<Drawer.TemporaryDrawer
			className={style.app_shell_menu}
			ref={ drawer => {
				this.drawer = drawer;
			}}
			onOpen={() => {
				console.log("open");
			}}
			onClose={() => {
				console.log("Close");
			}}
		>
				<Drawer.TemporaryDrawerHeader>
					Hello Header
				</Drawer.TemporaryDrawerHeader>
				<Link
					className="mdc-list-item"
					onClick={::this.handleClose}
					to="/">
						Home
				</Link>

				<Link
					className="mdc-list-item"
					onClick={::this.handleClose}
					to="/feedrizer">
						Feedrizer
				</Link>

				<Link
					className="mdc-list-item"
					onClick={::this.handleClose}
					to="/sampleapp">
						SampleApp
				</Link>
        </Drawer.TemporaryDrawer>
		);
	}
}

const mapState = state => ({
	menuNavigationEvent: state.app.menuNavigation[0]
});

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default connect(mapState, mapDispatch)(SideMenu);