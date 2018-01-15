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
const getCurrentOrder = (order) => ({type: GET_CURRENT_ORDER, order})


/**
 * THUNK CREATORS
 */
export const getCurrentOrderThunk = () =>
  dispatch =>
  axios.get('/api/orders')
  .then(allOrders => {
    const incompleteOrder = allOrders.data.find(elem => !elem.complete)
    return incompleteOrder
  })
  .then(incompleteOrder => dispatch(getCurrentOrder(incompleteOrder)))
  .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultOrder, action) {
    switch (action.type) {
      case GET_CURRENT_ORDER:
        return action.order
      default:
        return state
    }
  }
