import clients from '../../Data/Clients.json';
import { CREATE_CLIENT, GET_CLIENTS} from '../Actions/clients.action';

const initialState = {
    list: [],
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
        default:
            return state;
    }
}

export default clientsReducer;