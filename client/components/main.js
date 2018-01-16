import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Home from './home'
import AllBabies from './allBabies'
import Toast from './toast'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, message} = props
  return (
    <div>
      <nav className = "navbar navbar-expand-md navbar-light">
      <a className = "navbar-brand" href="/">Beanie Baby DreamLand</a>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home"><button>Home</button></Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">My Cart</Link>
              <a href="/" onClick={handleClick}>Logout</a>
            </div>
            : <div >
              {/* The navbar will show these links before you log in */}
              <Link to="/home">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">My Cart</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>

            </div>
        }
      </nav>
      <Toast message={message} visible={false} />
      {children}
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    message: '',
    visable: false
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  message: PropTypes.string
}
