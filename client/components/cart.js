import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Component } from 'React'
<<<<<<< HEAD
import store, {completeOrderThunk, getCurrentOrderThunk, createNewIncompleteOrderThunk} from '../store'

/* Component */
=======
import store, {completeOrderThunk, getCurrentOrderThunk, createNewIncompleteOrderThunk, getInitialCartThunk, deleteLineItemThunk} from '../store'
>>>>>>> 954818a8ef633a4a227cb84792014acbad1c96df

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
        console.log('length: ', this.props.cart.length)
        return (
            <div className="cart-container">

                <h3 className="cart-title">Your Cart:</h3>

                {
                    (this.props.cart.length !== 0)
                    ? <div>
                    {this.props.cart.map((item) => {
                    return (

                            <ul key={item.id}>
                                <li >{item.baby.name}</li>
                                <li >Price: {item.price}</li>
                                <li >Quantity: {item.quantity}</li>
                                <li>Subtotal: {item.price * item.quantity}</li>
                                <button className="btn btn-danger" onClick={(evt, lineItem, lineItemId) => this.props.deleteItem(evt, item, item.id)}>X</button>
                            </ul>

                    )
                })}
            <h3>Total: {calculateTotal(this.props.cart)}</h3>
            <button onClick={(evt) => this.props.checkout(evt, orderId, userId, calculateTotal(this.props.cart))}>Checkout</button>
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
      checkout (evt, orderId, userId, total){
        evt.preventDefault()
        dispatch(completeOrderThunk(orderId, total))
        .then(() => {
            dispatch(createNewIncompleteOrderThunk(userId))
        })
      },
      deleteItem (evt, lineItem, lineItemId){
        evt.preventDefault()
        dispatch(deleteLineItemThunk(lineItem, lineItemId))
        .then(() => {
            dispatch(getInitialCartThunk())
        })
      }
    }
}

const cartContainer = connect(mapState, mapDispatch)(Cart)
export default withRouter(cartContainer)
