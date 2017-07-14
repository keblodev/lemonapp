import * as types from '../statics/constants/ActionTypes';


export const componentLevelTestAction = text => ({ type: types.COMPONENTS_LEVEL_TEST_ACTION, text })

export const authAction =
	authEventObj => (
		{ type: types.AUTH_ACTION, authEventObj }
	)

export default {
	componentLevelTestAction,
	authAction
};
