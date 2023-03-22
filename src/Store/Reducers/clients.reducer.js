import clients from '../../Data/Clients.json';
import { SELECT_CLIENT_BY_ID } from '../Actions/clients.action';


const initialState = {
    clientsList: clients,
    selectedClient: null,
};

const categoryReducer = (state=initialState, action) =>{
    switch(action.type){
        case SELECT_CLIENT_BY_ID:
            const indexClient = state.clients.findIndex(({id}) => id===action.idClient)
            if (indexClient === -1) return state;
            return {...state, selectedClient: state.clientsList[indexClient]}
        default:
            return state;
    }
}

export default categoryReducer;