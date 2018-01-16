import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {fetchBabies, babiesThunk, getBabyCategory, getSearchResults, addToCartThunk, updateCartThunk, getInitialCartThunk} from '../store'

function mapStateProps(state){
  return {
    babies: state.babies,
    cart: state.cart,
    user: state.user,
    order: state.order
  }
}
function mapDispatchProps(dispatch){
  return {
    loadData (){
      dispatch(babiesThunk())
    },
    handleChange (evt){
      evt.preventDefault()
      if (typeof (evt.target.value) === 'string') {
        return dispatch(getBabyCategory(evt.target.value))
      }
    },
    updateCart (evt, lineItemId, baby){
      evt.preventDefault()
      const currentBaby = this.babies.find((elem) => {
        return elem.id === baby.id
      })
      const currentQuant = this.cart.find(elem => {
        return elem.babyId === +baby.id
      }).quantity
      dispatch(updateCartThunk({price: currentBaby.price, quantity: currentQuant + 1, userId: this.user.id, babyId: currentBaby.id, orderId: this.order.id}, lineItemId))
      .then(() => {
        dispatch(getInitialCartThunk())
      })
    },
    createLineItem (evt, baby){
      evt.preventDefault()
      const currentBaby = this.babies.find((elem) => {
        return elem.id === baby.id
      })
      dispatch(addToCartThunk({price: currentBaby.price, quantity: 1, userId: this.user.id, babyId: currentBaby.id, orderId: this.order.id}))
      .then(() => {
        dispatch(getInitialCartThunk())
      })
    },
    handleSubmitSearch (evt){
      evt.preventDefault()
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
        <div className="row">
        {babies.length && babies.map(baby => {
          return(
            <div key={baby.id} className="col-sm beanie-baby">
              <div>
                <Link to={`/products/${baby.id}`}  >{baby.name}</Link>
                <div>
                  <button type="submit" onClick={(evt) => {
                    let updateCart = false, lineItemId;
                    props.cart.forEach(lineItem => {
                      if (lineItem.babyId === baby.id){
                        updateCart = true
                        lineItemId = lineItem.id
                      }
                    })
                    if (updateCart){
                      props.updateCart(evt, lineItemId, baby)
                    }
                    else {
                      props.createLineItem(evt, baby)
                    }
                  }}>Add To Cart</button>
              </div>
                <img className="product-page-img" src={ baby.imageUrl } />
              </div>
              <br />
            </div>
          )
        })}
        </div>
      </div>
    )

}

const AllBabiesContainer = connect(mapStateProps, mapDispatchProps)(allBabies)
export default withRouter(AllBabiesContainer)

