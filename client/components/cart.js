import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Component } from 'React'
import store, {completeOrderThunk, getCurrentOrderThunk, createNewIncompleteOrderThunk, getInitialCartThunk, deleteLineItemThunk} from '../store'
import {ToastContainer, ToastStore} from 'react-toasts'

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
        const editItem = this.props.editItem
        console.log('CART COMPONENT ORDER ID', orderId)

        return (

            <div className="cart-container">
            <ToastContainer store={ToastStore} />

                <h3 className="cart-title">Your Cart:</h3>

                {
                    (this.props.cart.length !== 0)
                    ? <div>
                    {this.props.cart.map((item) => {
                    return (

                            <ul key={item.id}>
                                <li >{item.baby.name}</li>
                                <li >Price: {item.price}</li>
                                <li >Quantity:
                                    <form>
                                    <select className="quantity-form"
                                    onChange={(evt) => editItem()}>
                                        <option selected="selected">{item.quantity}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    </form>
                                </li>
                                <li>Subtotal: {item.price * item.quantity}</li>
                                <button className="btn btn-danger"
                                        onClick={(evt, lineItem, lineItemId) => {
                                            this.props.deleteItem(evt, item, item.id)
                                            ToastStore.success('Deleted From Cart')
                                        }}>X
                                </button>

                                   {/* edit button */}
                                <button className="btn btn-info"
                                onClick={(evt) => editItem(evt)}
                                    // (evt) => console.log('in onclick edit', item, evt.options[evt.selectedIndex].value)}
                                >Edit this line</button>



                            </ul>
                        )})}
                        </div>

                        : <div>
                            <h4>Your Cart is Empty</h4>
                          </div>
                }







            <h3>Total: {calculateTotal(this.props.cart)}</h3>
            <button onClick={(evt) => {
                this.props.checkout(evt, orderId, userId, calculateTotal(this.props.cart))
                ToastStore.success('Successfully Checked Out')
            }}>
            Checkout</button>

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
      },
      editItem (evt) {
          console.log('evt: ', evt)
        //   console.log('3', evt.options[evt.selectedIndex].value)
      }
    }
}

const cartContainer = connect(mapState, mapDispatch)(Cart)
export default withRouter(cartContainer)
