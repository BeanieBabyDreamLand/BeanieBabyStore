import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import store, {completeOrderThunk, getCurrentOrderThunk} from '../store'

/* Component */

const Cart = (props) => {

    const orderId = props.order.id

    return (
        <div>
            {props.cart.map((item) => {
                return (
                    <ul key={item.id}>
                        <li >{item.baby.name}</li>
                        <li >Price: {item.price}</li>
                        <li >Quantity: {item.quantity}</li>
                    </ul>
                )
            })}
        <button onClick={(evt) => props.checkout(evt, orderId)}>Checkout</button>
        </div>
    )
}

/* Comtainer */

const mapState = (state) => {
    return {
        cart: state.cart,
        order: state.order
    }
}

const mapDispatch = (dispatch) => {
  //what is orderId ????
    return {
      checkout (evt, orderId){
        evt.preventDefault()
        dispatch(getCurrentOrderThunk())
        dispatch(completeOrderThunk(orderId))
      }
    }
}

const cartContainer = connect(mapState, mapDispatch)(Cart)
export default withRouter(cartContainer)
