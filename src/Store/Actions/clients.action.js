export const SELECT_CLIENT_BY_ID = 'SELECT_CLIENT_BY_ID';

export const selectClientById = (idClient) =>({
    type: SELECT_CLIENT_BY_ID,
    idClient,
    selectedClient: null
})