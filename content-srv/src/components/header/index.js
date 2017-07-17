import { h, Component } from 'preact';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './style';

import AppActions from '../../actions';

import { Toolbar, Button, Card } from '../mdc';

class Header extends Component {

	currentRoute 		= null
	previousRoute 		= null
	currentDefaultTitle = 'LemonApp shell';

	componentWillMount() {
		const { newRouteString } = this.props;
		this.__setCurrentTitle(newRouteString);
	}

	componentWillUpdate({newRouteString}) {
		this.previousRoute = this.currentRoute;
		this.__setCurrentTitle(newRouteString);
	}

	shouldComponentUpdate = (({newRouteString}) => this.currentRoute !== newRouteString)

	__openMenu() {
		this.props.actions.openAppShellMenuAction(true);
	}

	__setCurrentTitle(titleString) {
		//TODO: revisist title set. Currently if reset state it set's to default
		// needs to be actual location based ideally
		this.currentRoute = titleString;
		this.currentTitle = this.currentRoute && this.currentRoute.length > 1 ? this.currentRoute : this.currentDefaultTitle;

		this.setState({
			title: this.currentTitle,
			previousTitle: this.previousRoute
		});
	}

	__handleLocationBack() {
		this.props.history.goBack();
	}

	render(_, {title, previousTitle}) {

		const backButton = this.currentTitle === this.currentDefaultTitle ? '' :

			<div
				key={previousTitle}
				class={(style.locationBarItemContent + " " + style.locaticonBarIcon)}>
				<Toolbar.Icon
					onClick={::this.__handleLocationBack}
					className={("material-icons " + style.locaticonBarIconContent)}
					>
					arrow_back
				</Toolbar.Icon>
			</div>
		;

		return (
			<Toolbar className={style.header}>
				<Toolbar.Row>
					<Toolbar.Section align-start={true}>
						<Toolbar.Title>
							<div class={style.locationBarItems}>
								<div
									class={style.locationBarItem}
									style={this.currentTitle === this.currentDefaultTitle ? '' : 'min-width: 30px;'}
								>
									<ReactCSSTransitionGroup
										transitionName={ {
											enter: style.locationTransitionEnter,
											enterActive: style.locationTransitionActive,
											leave: style.locationTransitionLeave,
											leaveActive: style.locationTransitionLeaveActive
										} }
										transitionLeaveTimeout={500}
										transitionEnterTimeout={500}
										>
											{backButton}
									</ReactCSSTransitionGroup>
								</div>
								<div class={style.locationBarItem}>
									<ReactCSSTransitionGroup
										transitionName={ {
											enter: style.locationTransitionEnter,
											enterActive: style.locationTransitionActive,
											leave: style.locationTransitionLeave,
											leaveActive: style.locationTransitionLeaveActive
										} }
										transitionLeaveTimeout={300}
										transitionEnterTimeout={300}
									>
										<div
										key={title}
										className={style.locationBarItemContent + ' ' + style.locaticonBarIconTitleText}
										>
											{title}
										</div>
									</ReactCSSTransitionGroup>
								</div>
							</div>
						</Toolbar.Title>
					</Toolbar.Section>
						<Toolbar.Icon
							onClick={::this.__openMenu}>
							apps
						</Toolbar.Icon>
				</Toolbar.Row>
			</Toolbar>
		);
	}
}

const mapState = (state, ownProps) => ({
	//ownProps are coming from router
	//TODO: do a selector in reducer
	newRouteString: state.routing.location && state.routing.location.pathname
});

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default withRouter(connect(mapState, mapDispatch)(Header));