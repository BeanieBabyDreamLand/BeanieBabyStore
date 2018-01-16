import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Component } from 'React'
import store, {completeOrderThunk, getCurrentOrderThunk, createNewIncompleteOrderThunk} from '../store'
import Toast from './toast'

/* Component */


export class Cart extends Component {

    componentWillMount(){
        store.dispatch(getCurrentOrderThunk)
    }

    render() {
        const orderId = this.props.order.id
    
        console.log('CART COMPONENT ORDER ID', orderId)
    
        return (
            <div>
                {this.props.cart.map((item) => {
                    return (
                        <ul key={item.id}>
                            <li >{item.baby.name}</li>
                            <li >Price: {item.price}</li>
                            <li >Quantity: {item.quantity}</li>
                        </ul>
                    )
                })}
            <button onClick={(evt) => this.props.checkout(evt, orderId)}>Checkout</button>
            </div>
        )
    }
}

/* Comtainer */

const mapState = (state) => {
    return {
        cart: state.cart,
        order: state.order
    }
}

const mapDispatch = (dispatch) => {
    return {
      checkout (evt, orderId){
        console.log('CHECKOUT FUNCTION IN MAP DISPATCH', orderId)
        evt.preventDefault()
        dispatch(completeOrderThunk(orderId))
        .then(() => {
            dispatch(createNewIncompleteOrderThunk())
        })
      }
    }
}

const cartContainer = connect(mapState, mapDispatch)(Cart)
export default withRouter(cartContainer)
