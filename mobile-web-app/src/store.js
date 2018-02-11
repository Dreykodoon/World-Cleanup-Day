import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducers as photoReducers } from './photo/photo-reducers';
import { reducers as authReducers } from './authentication/auth-reducers';

const rootReducer = combineReducers({auth: authReducers, photo: photoReducers});

export default createStore(rootReducer, undefined, applyMiddleware(thunk));
