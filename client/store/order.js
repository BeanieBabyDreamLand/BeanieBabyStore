import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER'
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = {}

/**
 * ACTION CREATORS
 */
const getCurrentOrder = (order) => ({type: GET_CURRENT_ORDER, order})
const setCurrentOrder = (order) => ({type: SET_CURRENT_ORDER, order})

/**
 * THUNK CREATORS
 */
export const createNewIncompleteOrderThunk = (userId) =>
  (dispatch) =>
  axios.post('/api/orders', {userId: userId})
  .then(newIncompleteOrder => {
    return newIncompleteOrder.data
  })
  .then( incompleteOrder => dispatch(setCurrentOrder(incompleteOrder)))
  .catch(err => console.log(err))


  export const getCurrentOrderThunk = () =>
  (dispatch, getState) =>
  axios.get('/api/orders')
  .then(allOrders => {
    const incompleteOrder = allOrders.data.find(elem => !elem.complete)
    return incompleteOrder
  })
  .then((incompleteOrder) => {
    if (incompleteOrder){
      dispatch(getCurrentOrder(incompleteOrder))
    }
    else {
      const userId = getState().user.id
      dispatch(createNewIncompleteOrderThunk(userId))
    }
  })
  .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultOrder, action) {
    switch (action.type) {
      case GET_CURRENT_ORDER:
        return action.order
      case SET_CURRENT_ORDER:
        return action.order
      default:
        return state
    }
  }
