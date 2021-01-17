import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';

const options = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
}

const creatingUser = (data) => {
    return {
        type: CREATE_USER,
        data
    }
}

const logingUser = (data) => {
    return {
        type: LOGIN_USER,
        data
    }
}

export const createUser = body => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDB = await axios.post('http://localhost:5000/users/new-user',
                body,
                options,
            )
            dispatch(creatingUser(userDB.data))
            resolve(userDB.data)
        } catch (error) {
            let errorCode = 'Ocurrió un error, seguramente la cuenta de email que ingresaste ya existe en la plataforma'
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorCode = error.response.data.message
            }
            dispatch(creatingUser(null))
            reject(errorCode)
        }
    })
}

export const loginUser = body => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDB = await axios.post('http://localhost:5000/users',
                body,
                options,
            )
            dispatch(logingUser(userDB.data))
            resolve(userDB.data)
        } catch (error) {
            let errorCode = 'La contraseña o el usuario son incorrectos'
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorCode = error.response.data.message
            }
            dispatch(logingUser(null))
            reject(errorCode)
        }
    })
}

export const logoutUser = () => dispatch => {
    dispatch(logingUser(null))
}
