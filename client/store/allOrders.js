import axios from 'axios'

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

const defaultOrders = []

const getAllOrders = (orders) => ({type: GET_ALL_ORDERS, orders})

export const fetchOrders = () =>
    dispatch =>
    axios.get('/api/orders')
    .then(res =>
        dispatch(getAllOrders(res.data || defaultOrders)))
    .catch(err => console.log(err))

export default function (state = defaultOrders, action) {
    switch (action.type) {
        case GET_ALL_ORDERS:
            return action.orders
        default:
            return state
    }
}