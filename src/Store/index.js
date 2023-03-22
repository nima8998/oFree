import {createStore, combineReducers} from 'redux';
import clientReducer from './Reducers/clients.reducer';

const RootReducer = combineReducers({
    clientsList: clientReducer,
});

export default createStore(RootReducer);