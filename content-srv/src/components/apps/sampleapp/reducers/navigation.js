import { COMPONENTS_LEVEL_TEST_ACTION } from '../statics/constants/ActionTypes';

const initialState = [{
  text: 'Use Redux from component',
  marked: false,
  id: 0
}];

export default function navigation(state = initialState, action) {
  switch (action.type) {
      case COMPONENTS_LEVEL_TEST_ACTION:
        return [{
            id: (state.length === 0) ? 0 : state[0].id + 1,
            marked: false,
            text: action.text
        }, ...state];  
      default:
        return state;      
  }

}