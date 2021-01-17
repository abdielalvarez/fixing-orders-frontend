import axios from 'axios';

export const GET_ORDER = 'GET_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';

const BASE_URL = 'https://typescript-backend.herokuapp.com'
const options = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
}

const gettingOrders = (data) => {
    return {
        type: GET_ORDER,
        data
    }
}

const updatingOrders = (data) => {
    return {
        type: UPDATE_ORDER,
        data
    }
}

export const getOrders = body => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const ordersDB = await axios.get(
                `${BASE_URL}/orders/order`,
                body,
                options,
            )
            dispatch(gettingOrders(ordersDB.data))
            resolve(ordersDB.data)
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
            dispatch(gettingOrders([]))
            reject(errorCode)
        }
    })
}

export const updateOrder = (body, orders) => dispatch => {
    return new Promise(async (resolve, reject) => {
        let orderList = orders
        let index = orders.findIndex(elem => elem._id === body._id)
        if (index >= 0) {
            try {
                const orderDB = await axios.put(
                    `${BASE_URL}/orders/order/${body._id}`,
                    body,
                    options,
                )
                orderList[index] = orderDB.data
                dispatch(updatingOrders(orderList))
                resolve(orderList)
            } catch (error) {
                let errorCode = 'An error happened with the data you entered'
                if (
                    error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    errorCode = error.response.data.message
                }
                reject(errorCode)
            }
        } else {
            reject('An error happened with the data you entered')
        }
    })
}
