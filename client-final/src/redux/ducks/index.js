import {combineReducers} from 'redux';
// reducers
import authReducer from './auth';

let reducers = combineReducers({

    auth: authReducer
});

export default reducers;    