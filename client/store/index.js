import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import babies from './babies'
import cart from './cart'
import review from './review'
import order from './order'
import checkout from './checkout'
import reviewInput from './reviewInput'


const reducer = combineReducers({
  user,
  babies,
  cart,
  order,
  checkout,
  review,
  reviewInput
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './babies'
export * from './cart'
export * from './review'
export * from './order'
export * from './checkout'
export * from './reviewInput'

