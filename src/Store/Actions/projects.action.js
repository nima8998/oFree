export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT_BY_ID = 'GET_PROJECT_BY_ID';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';

export const getProjects = (userId) => {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return async dispatch => {
        try {
            const response = await fetch(`${process.env.API_URL_FIREBASE}/projects.json?orderBy="userOwner"&equalTo="${userId}"`, options);
            const result = await response.json();
            const projects =
                result != null &&
                Object.keys(result).map(key => ({
                    ...result[key],
                    id: key
                }));
            dispatch({
                type: GET_PROJECTS,
                payload: projects
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export const createProject = (project) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...project, createDate: new Date() }),
    }

    return async dispatch => {
        return await fetch(`${process.env.API_URL_FIREBASE}/projects.json`, options)
            .then(
                () => dispatch({ type: CREATE_PROJECT, status: 200, message: "Proyecto creado con exito!" }),
                error => ({ status: 400, message: error.message })
            )
    }
}

export const updateProjectById = (projectData, projectId) => {
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...projectData, updateDate: new Date() }),
    }

    return async dispatch => {
        return await fetch(`${process.env.API_URL_FIREBASE}/projects/${projectId}.json`, options)
            .then(
                () => dispatch({ type: UPDATE_PROJECT, status: 200, message: "Proyecto actualizado con exito !" }),
                error => ({ status: 400, message: error.message })
            )
    }
}

export const getProjectById = (id) => ({
    type: GET_PROJECT_BY_ID,
    id
})