import { CREATE_TASK, DELETE_TASK, GET_TASKS, GET_TASK_BY_ID} from '../Actions/tasks.action';

const initialState = {
    list: [],
    selectedTask: null,
};

const tasksReducer = (state=initialState, action) =>{
    switch(action.type){
        case GET_TASKS:
            return{
                ...state,
                list: action.payload
            }
        case CREATE_TASK:
            return {
                ...state,
                payload: action.payload
            }
        case GET_TASK_BY_ID:
            return{
                ...state,
                selectedTask: state.list.find(({id})=> id === action.id)
            }
            case DELETE_TASK:
                return {
                    ...state,
                    payload: action.payload
                }
        default:
            return state;
    }
}

export default tasksReducer;