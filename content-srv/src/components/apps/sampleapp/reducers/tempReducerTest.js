import { COMPONENTS_LEVEL_TEST_ACTION_DVA } from '../statics/constants/ActionTypes';

const initialState = [{
  text: 'Use Redux from component DVA',
  marked: false,
  id: 0
}];

export default function tempReducerTest(state = initialState, action) {
  switch (action.type) {
      case COMPONENTS_LEVEL_TEST_ACTION_DVA:
        return [{
            id: (state.length === 0) ? 0 : state[0].id + 1,
            marked: false,
            text: action.text
        }, ...state];  
      default:
        return state;      
  }

}