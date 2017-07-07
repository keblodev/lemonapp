import { APP_SHELL_ACTION } from '../statics/constants/ActionTypes';

const initialState = [{
  text: 'Use Redux',
  marked: false,
  id: 0
}];

export default function navigation(state = initialState, action) {
  switch (action.type) {
      case APP_SHELL_ACTION:
        return [{
            id: (state.length === 0) ? 0 : state[0].id + 1,
            marked: false,
            text: action.text
        }, ...state];  
      default:
        return state;      
  }

}