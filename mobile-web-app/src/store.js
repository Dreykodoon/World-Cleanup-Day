import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers as photoReducers } from './photo/photo-reducers';
import { reducers as authReducers } from './authentication/auth-reducers';
import { reducers as globalsReducers } from './globals/globals-reducers';

const rootReducer = combineReducers({auth: authReducers, photo: photoReducers, globals: globalsReducers});

let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)));
