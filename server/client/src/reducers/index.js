import { combineReducers } from 'redux';
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer
});

// Always that "dispatch" is called, the reducer is called