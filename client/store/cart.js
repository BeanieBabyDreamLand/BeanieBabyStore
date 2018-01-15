import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const addToCart = item => ({type: ADD_TO_CART, item})
const removeFromCart = item => ({type: REMOVE_FROM_CART, item})

/**
 * THUNK CREATORS
 */
export const getInitialCartThunk = () =>
  dispatch =>
  axios.get('/api/cart')
    // axios.get(`/api/orders`)
    //   .then(allOrders => {
    //     allOrders = allOrders.data
    //     const currentOrder = allOrders.find(order => {
    //       if (order.user.email === email && order.complete === false){
    //         return order.lineItems
    //       }
    //     })
    //     return currentOrder
    //    // dispatch(getCart(currentOrder))
    //   })
    //   .then((currentOrder) => {
    //     const databaseCartData = [];
    //     currentOrder.lineItems.forEach((item) => {
    //       const lineItemId = item.id
    //       axios.get(`api/lineItems/${lineItemId}`)
    //       .then((itemData) => {
    //        databaseCartData.push(itemData.data)
    //       })
    //     })
    //     dispatch(getCart(databaseCartData))
    //   })
      .then(cart => dispatch(getCart(cart.data)))
      .catch(err => console.log(err))

//---- only adds new item to session cart ---\\\
export const addToCartSessionThunk = () =>
  dispatch =>
  axios.post('/api/cart/')
  .then(newItem => dispatch(addToCart(newItem.data)))
  .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART: //think about checking if beanie already is in cart
      return [...state.cart, action.item]
    case REMOVE_FROM_CART:
      return [...state.slice(0, state.indexOf(action.item)), ...state.slice(state.indexOf(action.item) + 1)]
    default:
      return state
  }
}
