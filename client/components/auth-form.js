import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {me, auth, cart,createNewIncompleteOrderThunk, getInitialCartThunk} from '../store'
import {ToastContainer, ToastStore} from 'react-toasts'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error, user} = props

  return (
    <div>
    <ToastContainer store={ToastStore}/>

      <form onSubmit={(evt) => handleSubmit(evt, user.id)} name={name}>
      {props.name === 'signup' && 
        (<div>
          <div>
          <label htmlFor="firstname"><small>First Name</small></label>
          <input name="firstname" type="string" />
        </div>
        <div>
          <label htmlFor="lastname"><small>Last Name</small></label>
          <input name="lastname" type="string" />
        </div>
        </div>)
        }
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && ToastStore.error('Incorrect credentials')}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    user: state.user
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt, userId) {
      evt.preventDefault()
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (evt.target.firstname && evt.target.lastname) {
        const firstname = evt.target.firstname.value
        const lastname = evt.target.lastname.value
        dispatch(auth(  email, password, formName, firstname, lastname  ))
        .then(() => {
          dispatch(me()) 
        })
        .then(() => {
         dispatch(createNewIncompleteOrderThunk(userId))
        })
        .then(() => {
         dispatch(getInitialCartThunk())
        })
      } 
      if (!evt.target.firstname || !evt.target.lastname) {
        dispatch(auth( email, password, formName  ))
        .then(() => {
          dispatch(getInitialCartThunk())
        })
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
