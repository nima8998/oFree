import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import clientReducer from './Reducers/clients.reducer';
import authReducer from './Reducers/auth.reducer';
import projectReducer from './Reducers/projects.reducer';

const RootReducer = combineReducers({
    clients: clientReducer,
    auth: authReducer,
    projects: projectReducer
});

export default createStore(RootReducer, applyMiddleware(thunk));