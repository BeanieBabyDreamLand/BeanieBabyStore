import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import store, {me, fetchOrders, babiesThunk} from '../store'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentWillMount(){
    store.dispatch(me())
    store.dispatch(fetchOrders)
  }
  componentDidMount(){
    store.dispatch(me())
  }
  
  render () {
    const {user} = this.props
    const {allOrders} = this.props
    const {allBabies} = this.props
    let track = 0;
    return (
      <div>
        <h3>Welcome, {user.firstname}</h3>
        <br />
        <h5 id="orderTitle">Orders:</h5>
        {allOrders.length && 
        <ul id="orderList">
          {allOrders.map(order => {
            if (order.complete === true){
              track++;
              return (
                <li key = {order.id}>
                  Ordered on {new Date(order.orderedAt).toDateString()} at {new Date(order.orderedAt).toTimeString().slice(0, 5)}
                  <ul>Products:
                    {allBabies.length && order.lineItems.map(item => {
                      let thisBaby;
                      for(var i=0; i<allBabies.length; i++){
                        if (allBabies[i].id === item.babyId) thisBaby = allBabies[i]
                      }
                      return (<li key={item.id}>{item.quantity} x {thisBaby.name} ${item.price}</li>)
                    })}
                    Total: ${order.total}
                  </ul>

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
//A TEST!!!!!

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user,
    allOrders: state.allOrders,
    allBabies: state.babies
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
