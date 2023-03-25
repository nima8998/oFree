import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import clientReducer from './Reducers/clients.reducer';

const RootReducer = combineReducers({
    clients: clientReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));