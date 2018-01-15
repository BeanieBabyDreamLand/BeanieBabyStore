import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const addToCart = item => ({type: ADD_TO_CART, item})
const updateCart = item => ({type: UPDATE_CART, item})
const removeFromCart = item => ({type: REMOVE_FROM_CART, item})
const completeOrderAndEmptyCart = cart => ({type: COMPLETE_ORDER, cart})

/**
 * THUNK CREATORS
 */
export const getInitialCartThunk = () =>
  dispatch =>
  axios.get('/api/cart')
      .then(cart => dispatch(getCart(cart.data)))
      .catch(err => console.log(err))


//---- creates a new line item with the correct order id ---\\\
export const addToCartThunk = (Item) =>
    dispatch =>
      axios.post('/api/lineItems', {price: Item.price, quantity: 1, userId: Item.userId, babyId: Item.babyId, orderId: Item.orderId})
      .then(newItem => {
        dispatch(addToCart(newItem.data))
      })
    .catch(err => console.log(err))

export const updateCartThunk = (Item, lineItemId) => {
  return (dispatch) => {
    return axios.put(`api/lineItems/${lineItemId}`, {price: Item.price, quantity: 1, userId: Item.userId, babyId: Item.babyId, orderId: Item.orderId})
    .then(updatedItem => {
      console.log('data from the put: ', updatedItem)
      return dispatch(updateCart(updatedItem))
    })
    .catch(err => console.log(err))
  }
}

export const completeOrderThunk = (orderId) =>
  dispatch =>
  axios.put(`/api/orders/${orderId}`, {complete: true})
  .then(completedOrder => {
    console.log('getting back completed order', completedOrder)
    dispatch(completeOrderAndEmptyCart([]))
  })
  .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.item]
    case UPDATE_CART:
      return state.map(elem => {
        if (elem.id === action.item.id){
          return action.item
        }
        else {
          return elem
        }
      })
    case REMOVE_FROM_CART:
      return [...state.slice(0, state.indexOf(action.item)), ...state.slice(state.indexOf(action.item) + 1)]
    case COMPLETE_ORDER:
      return action.cart
    default:
      return state
  }
}
