import axios from 'axios'
import history from '../history'



/**
 * ACTION TYPES
 */
const GET_BABIES = 'GET_BABIES'
const GET_ONE_BABY = 'GET_ONE_BABY'

/**
 * INITIAL STATE
 */
const defaultBabies = []

/**
 * ACTION CREATORS
 */
const getBabies = babies => ({type: GET_BABIES, babies})
const getOneBaby = baby => ({type: GET_ONE_BABY, baby})

/**
 * THUNK CREATORS
 */
export const babiesThunk = () =>
  dispatch =>
    axios.get('/api/babies')
      .then(res =>
        dispatch(getBabies(res.data || defaultBabies)))
      .catch(err => console.log(err))

export const fetchOneBaby = (id) =>
  dispatch =>
    axios.get(`/api/babies/${id}`)
      .then(res =>
        dispatch(getOneBaby(res.data || defaultBabies)))
      .then(res => console.log(res.data))
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
