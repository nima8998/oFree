import { SIGN_IN, LOG_IN, GET_USER_DATA, UPDATE_USER_DATA } from "../Actions/auth.action"


const initialState = {
    token: null,
    userIdExternalDB: null,
    userIdInternalDB: null,
    currentUser: null,
}

const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case SIGN_IN:
            return{
                ...state,
                token: action.token,
                userIdExternalDB: action.userIdExternalDB,
                currentUser: null
            }
        case LOG_IN:
            return{
                ...state,
                token: action.token,
                userIdExternalDB: action.userIdExternalDB,
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
        default:
            return state;
    }
}


export default authReducer;