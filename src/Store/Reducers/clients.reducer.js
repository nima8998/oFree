import { CREATE_CLIENT, GET_CLIENTS, GET_CLIENT_BY_ID, UPDATE_CLIENT_ERROR, UPDATE_CLIENT} from '../Actions/clients.action';

const initialState = {
    list: [],
    selectedClient: null,
    status: null,
    message: null
};

const clientsReducer = (state=initialState, action) =>{
    switch(action.type){
        case GET_CLIENTS:
            return{
                ...state,
                list: action.payload
            }
        case CREATE_CLIENT:
            return {
                ...state,
                payload: action.payload
            }
        case GET_CLIENT_BY_ID:
            return{
                ...state,
                selectedClient: state.list.find(({id})=> id === action.id)
            }
        case UPDATE_CLIENT_ERROR:
            return {
                ...state,
                status: action.status,
                message: action.message,
                error: action.error,
            };
        case UPDATE_CLIENT:
            return {
                ...state,
                clients: state.list.map(client => client.id === action.data.id ? action.data : client),
                status: action.status,
                message: action.message,
            };
        default:
            return state;
    }
}

export default clientsReducer;