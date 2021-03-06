import {
  actions
} from './actions';
import update from 'react-addons-update';

const initialState = {
  loading: false,
  response: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions['REQUEST']:
      return update(state, {
        $set: {
          loading: true,
        },
      });
    case actions['SUCCESS']:
      return update(state, {
        $set: {
          loading: false,
          response: action.response,
        },
      });
    case actions['FAILURE']:
      return update(state, {
        $set: {
          loading: false,
        },
      });
    default:
      return state;
  }
};
