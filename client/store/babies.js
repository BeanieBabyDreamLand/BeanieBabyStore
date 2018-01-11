import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BABIES = 'GET_BABIES'
const GET_ONE_BABY = 'GET_ONE_BABY'
const GET_BABY_BY_CATEGORY = 'GET_BABY_BY_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultBabies = []

/**
 * ACTION CREATORS
 */
const getBabies = babies => ({type: GET_BABIES, babies})
const getOneBaby = baby => ({type: GET_ONE_BABY, baby})
const getBabyByCategory = babies => ({type: GET_BABY_BY_CATEGORY, babies})

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
      .catch(err => console.log(err))

export const getBabyCategory = (category) =>
  dispatch =>
    axios.get(`/api/babies`)
      .then(res => {
        const allbabies = res.data
        if (category !== 'all') {
          const filteredBabies =
          allbabies.filter(baby => baby.category === category)
          return dispatch(getBabyByCategory(filteredBabies))
        }
        return dispatch(getBabies(allbabies))
        })
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = defaultBabies, action) {
  switch (action.type) {
    case GET_BABIES:
      return action.babies
    case GET_ONE_BABY:
      return action.baby
    case GET_BABY_BY_CATEGORY:
      return action.babies
    default:
      return state
  }
}
