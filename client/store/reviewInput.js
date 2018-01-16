import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
export const WRITE_REVIEW = 'WRITE_REVIEW'

/**
 * INITIAL STATE
 */
export const defaultInput = ''

/**
 * ACTION CREATORS
 */
export const writeReview = input => ({type: WRITE_REVIEW, input})

/**
 * REDUCER
 */

export default function (state = defaultInput, action) {
  switch (action.type) {
    case WRITE_REVIEW:
      return action.input
    default:
      return state
  }
}
