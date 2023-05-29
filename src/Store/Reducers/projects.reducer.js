import { CREATE_PROJECT, GET_PROJECTS, GET_PROJECT_BY_ID, DELETE_PROJECT} from '../Actions/projects.action';

const initialState = {
    list: [],
    selectedProject: null,
};

const projectReducer = (state=initialState, action) =>{
    switch(action.type){
        case GET_PROJECTS:
            return{
                ...state,
                list: action.payload
            }
        case CREATE_PROJECT:
            return {
                ...state,
                payload: action.payload
            }
        case GET_PROJECT_BY_ID:
            return{
                ...state,
                selectedProject: state.list.find(({id})=> id === action.id)
            }
        case DELETE_PROJECT:
            return{
                ...state,
                payload: action.payload
            }
        default:
            return state;
    }
}

export default projectReducer;