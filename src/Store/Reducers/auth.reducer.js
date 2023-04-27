import { SIGN_IN, LOG_IN, GET_USER_DATA, UPDATE_USER_DATA, LOG_OUT } from "../Actions/auth.action"


const initialState = {
    token: null,
    userId: null,
    currentUser: null,
}

const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case SIGN_IN:
            return{
                ...state,
                token: action.token,
                userId: action.userId,
            }
        case LOG_IN:
            return{
                ...state,
                token: action.token,
                userId: action.userId,
            }
        case GET_USER_DATA:
            return{
                ...state,
                currentUser: action.user
            }
        case UPDATE_USER_DATA:
            return{
                ...state,
                payload: action.response
            }
        case LOG_OUT:
            return{
                state: initialState
            }
        default:
            return state;
    }
}


export default authReducer;