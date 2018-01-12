import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {babiesThunk, getBabyCategory, getSearchResults} from '../store'

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
      console.log('CHANGE', evt)
      if (typeof (evt.target.value) === 'string') {
        return dispatch(getBabyCategory(evt.target.value))
      }
    },
    handleSubmit (evt){
      console.log('SUBMIT',evt)
    },
    handleSearchChange (evt){
      evt.preventDefault()
      // return evt.target.value
    },
    handleSubmitSearch (evt){
      evt.preventDefault()
      console.log(evt.target.search.value)
    }
  }
}
const inputValue = ''
export const allBabies = (props) => {
  const babies = props.babies;
  console.log('props history', props.history)

  return (
    <div>
      <div>
        <form >
          <select name='refine' onChange={props.handleChange}>
            <option value='all'>All</option>
            <option value='rare'>Rare</option>
            <option value='common'>Common</option>
            <option value='unicorn'>Unicorn</option>
          </select>
        </form>
        <form className='search' onSubmit={props.handleSubmitSearch} >
          <label>Search:
            <input
              name='search'
              type='text'
              onChange={props.handleSearchChange}
              // value=""
            />
          </label>
          <button type='submit'>Go</button>
        </form>

        </div>
      {babies.length && babies.map(baby => {
        return(
          <div key={baby.id}>
            <div>
              <Link to={`/products/${baby.id}`}  >{baby.name}</Link>
              <img src={ baby.imageUrl } />
            </div>
            <div>
              <form onSubmit={props.handleSubmit}>
                <button type="submit" >Add To Cart</button>
              </form>
            </div>
            <br />
          </div>
        )
      })}
    </div>
  )
}

const AllBabiesContainer = connect(mapStateProps, mapDispatchProps)(allBabies)
export default withRouter(AllBabiesContainer)

