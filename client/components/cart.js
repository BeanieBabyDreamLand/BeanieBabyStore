import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

/* Component */

const Cart = (props) => {
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
        </div>
    )
}

/* Comtainer */

const mapState = (state) => {
    return {
        cart: state.cart
    }
}

// const mapDispatch = (dispatch) => {
//     return dispatch()
// }

export default withRouter(connect(mapState)(Cart))
