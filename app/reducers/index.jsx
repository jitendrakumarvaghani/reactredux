import { combineReducers } from 'redux';
import invite from './invite-reducer';

const rootReducer = combineReducers({
  invite,
});

export default rootReducer;
