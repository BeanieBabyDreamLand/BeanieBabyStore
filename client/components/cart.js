import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Component } from 'React'
import store, {completeOrderThunk, getCurrentOrderThunk, createNewIncompleteOrderThunk} from '../store'

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
                        </ul>
                    )})}
                    </div>

                    : <div>
                        <h4>Your Cart is Empty</h4>
                    </div>


                }
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
