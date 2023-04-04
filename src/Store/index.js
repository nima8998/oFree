import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import clientReducer from './Reducers/clients.reducer';
import authReducer from './Reducers/auth.reducer';
import projectReducer from './Reducers/projects.reducer';
import tasksReducer from './Reducers/tasks.reducer';

const RootReducer = combineReducers({
    clients: clientReducer,
    auth: authReducer,
    projects: projectReducer,
    tasks: tasksReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));