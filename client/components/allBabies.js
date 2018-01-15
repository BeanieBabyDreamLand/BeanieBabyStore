import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {fetchBabies, babiesThunk, getBabyCategory, getSearchResults} from '../store'

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
      console.log('SUBMIT', evt)
    },
    handleSubmitSearch (evt){
      evt.preventDefault()
        console.log()
        const searchWord = evt.target.search.value
        return dispatch(getSearchResults(searchWord))
    },
    handleClearSearch(evt) {
      evt.preventDefault()
      return dispatch(babiesThunk())
    }
  }
}

export const allBabies = (props) => {

    const babies = props.babies;
    return (
        <div className="container">
        <br />
        <div className="container row">
          <form className="col-sm-3">
            <select name='refine' onChange={props.handleChange}>
              <option value='all'>All</option>
              <option value='rare'>Rare</option>
              <option value='common'>Common</option>
              <option value='unicorn'>Unicorn</option>
            </select>
          </form>

          <div className="container col-sm-9">
            <div className="row">
              <form className='search' onSubmit={props.handleSubmitSearch} >
                <label>Search:
                  <input
                    name='search'
                    type='text'
                  />
                  <button id="submit-btn" type='submit' name='go' value='go'>Go</button>
                </label>
              </form>
            
            <form id="clearButton" onSubmit={props.handleClearSearch} >
              <button  type='submit' name='clear' value='clear'>Clear Search</button>
            </form>
            </div>
          </div>
        </div>
        {babies.length && babies.map(baby => {
          return(
            <div key={baby.id}>
              <div>
                <Link to={`/products/${baby.id}`}  >{baby.name}</Link>
                <div>
                <form onSubmit={props.handleSubmit}>
                  <button type="submit" >Add To Cart</button>
                </form>
              </div>
                <img src={ baby.imageUrl } />
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

