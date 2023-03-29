import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import clientReducer from './Reducers/clients.reducer';
import authReducer from './Reducers/auth.reducer';

const RootReducer = combineReducers({
    clients: clientReducer,
    auth: authReducer
});

export default createStore(RootReducer, applyMiddleware(thunk));