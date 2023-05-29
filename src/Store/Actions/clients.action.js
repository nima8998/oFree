export const CREATE_CLIENT = 'CREATE_CLIENT';
export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENT_BY_ID = 'GET_CLIENT_BY_ID';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const DELETE_CLIENT = 'DELETE_CLIENT';

export const getClients = (userId) =>{
    const options ={
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return async dispatch => {
        try {
            const response = await fetch(`${process.env.API_URL_FIREBASE}/clients.json?orderBy="userOwner"&equalTo="${userId}"`, options);
            const result = await response.json();
            const clients = 
                result != null &&
                Object.keys(result).map(key=>({
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
        return await fetch(`${process.env.API_URL_FIREBASE}/clients.json`, options)
            .then(
                () => dispatch({type: CREATE_CLIENT, status: 200, message: "Cliente creado con exito !"}),
                error => ({status: 400, message: error.message})
            )
    }
}

export const updateClient = (clientData,clientId) =>{
    const options = {
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...clientData, updateDate: new Date()}),
    }

    return async dispatch => {
        return await fetch(`${process.env.API_URL_FIREBASE}/clients/${clientId}.json`, options)
            .then(
                () => dispatch({type: UPDATE_CLIENT, status: 200, message: "Cliente actualizado con exito !"}),
                error => ({status: 400, message: error.message})
            )
    }
}

export const deleteClientById = (projectId) =>{
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }

    return async dispatch => {
        return await fetch(`${process.env.API_URL_FIREBASE}/clients/${projectId}.json`, options)
            .then(
                () => dispatch({ type: DELETE_CLIENT, status: 200, message: "Cliente eliminado con exito !" }),
                error => ({ status: 400, message: error.message })
            )
    }
}

export const getClientById = (id) =>({
    type: GET_CLIENT_BY_ID,
    id
})
  