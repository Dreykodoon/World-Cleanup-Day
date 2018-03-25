import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers as trashpointReducers } from './trashpoint/trashpoint-reducers';
import { reducers as authReducers } from './authentication/auth-reducers';
import { reducers as globalsReducers } from './globals/globals-reducers';
import { reducers as userReducers } from './user/user-reducers';

const rootReducer = combineReducers({
    auth: authReducers,
    trashpoint: trashpointReducers,
    globals: globalsReducers,
    user: userReducers,
});

let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)));
