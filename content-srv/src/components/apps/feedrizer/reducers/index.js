import { combineReducers } from 'redux';
import navigation from './navigation';

import auth from './auth';

import { getLocalStore } from '../../appsStoreUtils';

const REDUCER_ID = "rootFeedrizerAppReducer";

export default combineReducers({
  navigation,
  auth
});

export const getAuth = (store) => getLocalStore(store)(REDUCER_ID).auth;

