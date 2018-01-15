import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const ADD_REVIEW = 'ADD_REVIEW'
const GET_REVIEWS = 'GET_REVIEWS'

/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * ACTION CREATORS
 */

const addReview = review => ({type: ADD_REVIEW, review})
const getReviews = reviews => ({type: GET_REVIEWS, reviews})

/**
 * THUNK CREATORS
 */
export const getReviewsThunk = () =>
  dispatch =>
    axios.get('/api/reviews')
      .then(res =>
        dispatch(getReviews(res.data ||
        defaultReviews)))
      .catch(err => console.log(err))


export const postReview = (review) =>
// console.log('review in thunk', review)
  dispatch =>
    axios.post('/api/reviews', review)
      .then(res => res.data)
      .then(newReview => {
        dispatch(addReview(newReview))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */

export default function (state = defaultReviews, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return action.reviews
    case GET_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
