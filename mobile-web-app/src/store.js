import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './photo/photo-reducers';

export default createStore(reducers, undefined, applyMiddleware(thunk));
