import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
  const {user} = props

  return (
    <div>
      <h3>Welcome, {user.firstname}</h3>
      <br />
      <h5 id="orderTitle">Orders:</h5>
      {user.orders && 
      <ul id="orderList">
        {user.orders.map(order => 
          <li key = {order.id}>{order.orderedAt}</li>
        )}
      </ul>
      }
      {!user.orders &&
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
        {!user.reviews &&
        <div>
          <p>No past reviews to show</p>
        </div>
        }
    </div>
  )
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
