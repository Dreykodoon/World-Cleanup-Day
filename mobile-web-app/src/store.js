import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducers as photoReducers } from './photo/photo-reducers';
import { reducers as authReducers } from './authentication/auth-reducers';
import { reducers as globalsReducers } from './globals/globals-reducers';

const rootReducer = combineReducers({auth: authReducers, photo: photoReducers, globals: globalsReducers});

export default createStore(rootReducer, undefined, applyMiddleware(thunk));
