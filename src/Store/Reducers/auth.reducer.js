import { SIGN_IN, LOG_IN } from "../Actions/auth.action"


const initialState = {
    token: null,
    userId: null
}

const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case SIGN_IN:
            return{
                ...state,
                token: action.token,
                userId: action.userId
            }
        case LOG_IN:
            return{
                ...state,
                token: action.token,
                userId: action.userId
            }
        default:
            return state;
    }
}


export default authReducer;