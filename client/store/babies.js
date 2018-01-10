import axios from 'axios'
import history from '../history'



/**
 * ACTION TYPES
 */
const GET_BABIES = 'GET_BABIES'

/**
 * INITIAL STATE
 */
const defaultBabies = []

/**
 * ACTION CREATORS
 */
const getBabies = babies => ({type: GET_BABIES, babies})

/**
 * THUNK CREATORS
 */
export const babiesThunk = () =>
  dispatch =>
    axios.get('/api/babies')
      .then(res =>
        dispatch(getBabies(res.data || defaultBabies)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultBabies, action) {
  switch (action.type) {
    case GET_BABIES:
      return action.babies
    default:
      return state
  }
}
