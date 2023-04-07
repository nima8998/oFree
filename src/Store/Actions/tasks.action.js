export const GET_TASKS = 'GET_TASKS';
export const CREATE_TASK = 'CREATE_TASK';
export const GET_TASK_BY_ID = 'GET_TASK_BY_ID';
export const UPDATE_TASK = 'UPDATE_TASK';

export const getTasks = () => {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return async dispatch => {
        try {
            const response = await fetch(`${process.env.API_URL_FIREBASE}/tasks.json`, options);
            const result = await response.json();
            const tasks =
                result != null &&
                Object.keys(result).map(key => ({
                    ...result[key],
                    id: key
                }));
            dispatch({
                type: GET_TASKS,
                payload: tasks
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export const createTask = (taskData) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...taskData, updateDate: new Date() }),
    }

    return async dispatch => {
        return await fetch(`${process.env.API_URL_FIREBASE}/tasks.json`, options)
            .then(
                () => dispatch({ type: CREATE_TASK, status: 200, message: "Tarea agregada al proyecto." }),
                error => ({ status: 400, message: error.message })
            )
    }
}

export const updateTaskById = (taskData, taskId) => {
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...taskData, updateDate: new Date() }),
    }

    return async dispatch => {
        return await fetch(`${process.env.API_URL_FIREBASE}/tasks/${taskId}.json`, options)
            .then(
                () => dispatch({ type: UPDATE_TASK, status: 200, message: "Tarea actualizada con exito !" }),
                error => ({ status: 400, message: error.message })
            )
    }
}

export const getTaskById = (id) => ({
    type: GET_TASK_BY_ID,
    id
})