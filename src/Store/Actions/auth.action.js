import { createUserDataLocal } from "../../../db"

export const SIGN_IN = "SIGN_IN"
export const LOG_IN = "LOG_IN"
export const GET_USER_DATA = "GET_USER_DATA"
export const UPDATE_USER_DATA = "UPDATE_USER_DATA"


export const signUp = (user,password) =>{
    const options = {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: user,
            password: password,
            returnSecureToken: true
        })
    }

    return async dispatch =>{
        try {
            const responseFirebaseSignup = await fetch (`${process.env.API_URL_FIREBASE_SIGNUP}${process.env.FIREBASE_API_KEY}`, options);
            
            const data = await responseFirebaseSignup.json();
            
            dispatch({
                type: SIGN_IN,
                token: data.idToken,
                userIdExternalDB: data.localId,
            })
        } catch (error) {
            console.log('Error caught while signing up.', error)
        }
    }
}

export const login = (user,password) =>{
    const options = {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: user,
            password: password,
            returnSecureToken: true
        })
    }
    return async dispatch =>{
        try {
            const response = await fetch (`${process.env.API_URL_FIREBASE_LOGIN}${process.env.FIREBASE_API_KEY}`, options);

            const data = await response.json();
       
            dispatch({
                type: LOG_IN,
                token: data.idToken,
                userIdExternalDB: data.localId
            })
        } catch (error) {
            console.log('Error caught while loging up', error)
        }
    }
}

export const getUserData = (idToken) =>{
    const options = {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idToken,
        })
    }

    return async dispatch =>{
        try {
            const response = await fetch (`${process.env.API_URL_FIREBASE_GET_USER_DATA}${process.env.FIREBASE_API_KEY}`, options);

            const data = await response.json();

            dispatch({
                type: GET_USER_DATA,
                user: data?.users[0]
            })
        } catch (error) {
            console.log('Error caught while loging up', error)
        }
    }
}

export const updateUserData = (idToken, displayName, photoUrl, email, returnSecureToken = true) =>{
    const options = {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idToken,
            displayName,
            photoUrl,
            email,
            returnSecureToken
        })
    }
    

    return async dispatch => {
        return await fetch (`${process.env.API_URL_FIREBASE_UPDATE_USER_DATA}${process.env.FIREBASE_API_KEY}`, options)
            .then(() => dispatch({type: UPDATE_USER_DATA, message: "Perfil actualizado con éxito."}))
            .catch(error => ({message: error.message}))
    }
}