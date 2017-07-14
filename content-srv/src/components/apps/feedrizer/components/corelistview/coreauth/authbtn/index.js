import { h, Component } from 'preact';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MDC from '../../../mdc';
const { Card, LayoutGrid, Textfield, Button, LinearProgress } = MDC;

import AppActions from '../../../../actions';

import { AuthStates,  AppIds } from '../../../../statics/constants/Auth';

const AuthBtn = ({history, location, actions, auth, appId, getAppAuthUrlMutation}) => {
	const handleAuth = () => {
		const authEventObj = {
			appId: appId,
			event: {
				state: AuthStates.IN_PROGRESS
			}
		};

		//preventing any queries right now to intervene
		history.push(location.pathname);

		actions.authAction(authEventObj);

		getAppAuthUrlMutation({
			variables: {
				for_app: authEventObj.appId,
			},
			update: (
				store,
				{ data: {
					getAuthUrl: {auth_url}
				} }) => {
					console.log(auth_url);
					//TODO: mayby use <Redirect /> instead
					document.location.href = auth_url;
			}
		});
	};

	return (
		<Button
			accent
			ripple
			raised
			onClick={handleAuth}
		>{
			auth.authState[appId].state === AuthStates.IN_PROGRESS ?
				<LinearProgress indeterminate={true} accent={true} /> :
				"auth " + appId		
		}
		</Button>
	);
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});


export default 
	connect(null,mapDispatch)(AuthBtn);