import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props

  return (
    <div>
      <nav className = "navbar navbar-expand-md fixed-top">
      <a className = "navbar-brand" href="#">Beanie Baby Dreamland</a>
        {/* <button className = "navbar-toggler collapsed" type = "button" data-toggle = "collapse" data-target = "#navbarCollapse" aria-controls = "navbarCollapse" aria-expanded = "false" aria-label = "Toggle navigation">
             <span className = "navbar-toggler-icon" />
          </button> 
        <div className =  "navbar-collapse collapse" id = "navbarCollapse">
          <ul className = "navbar-nav mr-auto">
            <li className = "nav-item">
              <a className = "nav-link" href="#">
                "Home "
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className = "nav-item">
              <a className = "nav-link" href="#">
                "Login "
              </a>
            </li>
            <li className = "nav-item">
              <a className = "nav-link" href="#">
                "Sign up "
              </a>
            </li>
            <li className = "nav-item">
              <a className = "nav-link" href="#">
                "Logout "
              </a>
            </li>
          </ul>
        </div> */}
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
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
  isLoggedIn: PropTypes.bool.isRequired
}
