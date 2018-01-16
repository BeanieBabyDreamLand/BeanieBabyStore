import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import store, {me} from '../store'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentWillMount(){
    store.dispatch(me())
  }
  componentDidMount(){
    store.dispatch(me())
  }
  
  render () {
    const {user} = this.props
    let track = 0;
    return (
      <div>
        <h3>Welcome, {user.firstname}</h3>
        <br />
        <h5 id="orderTitle">Orders:</h5>
        {user.orders && 
        <ul id="orderList">
          {user.orders.map(order => {
            if (order.complete === true){
              track++;
              return (
                <li key = {order.id}>
                  Order #{order.id} ordered at {order.orderedAt}
                </li>
              )
            }
            if (track === 0) {
              return (
                <p key = "noOrders">No past orders to show</p>
              )
            }
          }
          )}
        </ul>
        }
        {console.log('order, orders',user.order, user.orders)}
        {(!user.orders || user.orders.length === 0) &&
          
        <div>
          <p>No past orders to show</p>
        </div>
        }
        <br />
        <h5>Reviews:</h5>
        {user.reviews && 
          <ul id="reviewList">
            {user.reviews.map(review => 
              (<li key = {review.id} className="foo">
                ({review.rating}) stars for baby # {review.babyId}: {review.text}
              </li>)
            )}
          </ul>
          }
          {(!user.reviews || user.reviews.length === 0) &&
          <ul>
            <p>No past reviews to show</p>
          </ul>
          }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
