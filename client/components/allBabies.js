import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {babiesThunk, getBabyCategory} from '../store'

function mapStateProps(state){
  return {
    babies: state.babies
  }
}
function mapDispatchProps(dispatch){
  return {
    loadData (){
      dispatch(babiesThunk())
    },
    handleChange (evt){
      evt.preventDefault()
      return dispatch(getBabyCategory(evt.target.value))
    }
  }
}

export const allBabies = (props) => {
  const babies = props.babies;
  console.log('props history', props.history)

  return (
    <div>
      <div>
        <form onChange={props.handleChange}>
          <select name='refine'>
            <option value='rare'>Rare</option>
            <option value='common'>Common</option>
            <option value='unicorn'>Unicorn</option>
            <option value='all'>All</option>
          </select>
        </form>
      </div>

      {babies.length && babies.map(baby => {
        return(
          <Link to={`/products/${baby.id}`} key={baby.id} >
          <div >
            <h3>{baby.name}</h3>
            <img src={ baby.imageUrl } />
          </div>
          </Link>
        )
      })}
    </div>
  )
}

const AllBabiesContainer = connect(mapStateProps, mapDispatchProps)(allBabies)
export default withRouter(AllBabiesContainer)

