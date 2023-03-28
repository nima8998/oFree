import { CREATE_CLIENT, GET_CLIENTS, GET_CLIENT_BY_ID} from '../Actions/clients.action';

const initialState = {
    list: [],
    selectedClient: null,
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
        default:
            return state;
    }
}

export default clientsReducer;