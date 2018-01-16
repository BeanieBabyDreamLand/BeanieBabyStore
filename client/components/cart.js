import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Component } from 'React'
import store, {completeOrderThunk, getCurrentOrderThunk, createNewIncompleteOrderThunk} from '../store'

const calculateTotal = (arr) => {
  let sum = 0
  arr.forEach(item => {
    sum += (item.price * item.quantity)
  })
  return sum
}

/* Component */
export class Cart extends Component {

    componentWillMount(){
        store.dispatch(getCurrentOrderThunk)
    }

    render() {
        const orderId = this.props.order.id, userId = this.props.user.id

        console.log('CART COMPONENT ORDER ID', orderId)

        return (
            <div>
                {this.props.cart.map((item) => {
                    return (
                        <ul key={item.id}>
                            <li >{item.baby.name}</li>
                            <li >Price: {item.price}</li>
                            <li >Quantity: {item.quantity}</li>
                            <li>Subtotal: {item.price * item.quantity}</li>
                        </ul>
                    )
                })}
            <h3>Total: {calculateTotal(this.props.cart)}</h3>
            <button onClick={(evt) => this.props.checkout(evt, orderId, userId)}>Checkout</button>
            </div>
        )
    }
}


/* Comtainer */

const mapState = (state) => {
    return {
        cart: state.cart,
        order: state.order,
        user: state.user
    }
}

const mapDispatch = (dispatch) => {
    return {
      checkout (evt, orderId, userId){
        console.log('CHECKOUT FUNCTION IN MAP DISPATCH', orderId)
        evt.preventDefault()
        dispatch(completeOrderThunk(orderId))
        .then(() => {
            dispatch(createNewIncompleteOrderThunk(userId))
        })
      }
    }
}

const cartContainer = connect(mapState, mapDispatch)(Cart)
export default withRouter(cartContainer)
