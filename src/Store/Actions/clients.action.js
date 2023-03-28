export const CREATE_CLIENT = 'CREATE_CLIENT';
export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENT_BY_ID = 'GET_CLIENT_BY_ID';
import { API_URL_FIREBASE } from "../../Constants/Database";

export const getClients = () =>{
    const options ={
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return async dispatch => {
        try {
            const response = await fetch(`${API_URL_FIREBASE}/clients.json`, options);
            const result = await response.json();
            const clients = Object.keys(result).map(key=>({
                ...result[key],
                id: key
            }));
            dispatch({
                type: GET_CLIENTS,
                payload: clients
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export const createClient = (client) =>{
    const options = {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...client, createDate: new Date()}),
    }

    return async dispatch => {
        return await fetch(`${API_URL_FIREBASE}/clients.json`, options)
            .then(
                () => dispatch({type: CREATE_CLIENT, status: 200, message: "Cliente creado con exito !"}),
                error => ({status: 400, message: error.message})
            )
    }
}

export const getClientById = (id) =>({
    type: GET_CLIENT_BY_ID,
    id
})