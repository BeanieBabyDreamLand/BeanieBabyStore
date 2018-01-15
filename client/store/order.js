import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = {}

/**
 * ACTION CREATORS
 */
const getCurrentOrder = (orderId) => ({type: GET_CURRENT_ORDER, orderId})


/**
 * THUNK CREATORS
 */
export const getCurrentOrderThunk = () =>
  dispatch =>
  axios.get('/api/orders')
  .then(allOrders => {
    const incompleteOrder = allOrders.data.find(elem => !elem.complete)
    return incompleteOrder.id
  })
  .then(incompleteOrderId => dispatch(getCurrentOrder(incompleteOrderId)))
  .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultOrder, action) {
    switch (action.type) {
      case GET_CURRENT_ORDER:
        return action.orderId
      default:
        return state
    }
  }
