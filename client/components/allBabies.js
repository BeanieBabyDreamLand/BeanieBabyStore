import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {fetchBabies, babiesThunk, getBabyCategory, getSearchResults, addToCartThunk, updateCartThunk, getInitialCartThunk} from '../store'
import {ToastContainer, ToastStore} from 'react-toasts'

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
       dispatch(babiesThunk())
    }
  }
}

export const allBabies = (props) => {

    const babies = props.babies;


    return (
        <div className="container">
        <ToastContainer store={ToastStore} />
        
        <br />
        <div className="container row">
          <div className="dropdown">
          <form className="col-sm-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Search by Rarity
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onChange={props.handleChange}>
              <select name='refine' onChange={props.handleChange}>
                <option value='all'>All</option>
                <option value='rare'>Rare</option>
                <option value='common'>Common</option>
                <option value='unicorn'>Unicorn</option>
              </select>
            </div>
          </form>
        </div>

          <div className="container col-sm-9">
            <div className="row">

              <form className="form-inline" onSubmit={props.handleSubmitSearch} >
                <input 
                  className="form-control" 
                  placeholder="Search" 
                  aria-label="Search" 
                  aria-describedby="basic-addon2"
                  name='search'
                  type='text'
                />
                <button 
                  id="submit-btn" 
                  className="btn btn-outline-secondary input-group-append" 
                  type='submit' 
                  name='go' 
                  value='go'>Go
                </button>
              </form>

            <form id="clearButton" onSubmit={props.handleClearSearch} >
              <button id="submit-btn" type='submit' name='clear' value='clear' className="btn btn-outline-secondary clear-btn form-control">Clear</button>
            </form>

            </div>
          </div>

        </div>
        <br/>
        <div className="row">
        {babies.length && babies.map(baby => {
          return(
            <div key={baby.id} className="col-sm beanie-baby">
              <div>
                <img className="product-page-img img-thumbnail" src={ baby.imageUrl } />
                <br />
                <Link to={`/products/${baby.id}`}  >{baby.name}</Link>
                <div>
                  <button type="submit" className="btn btn-light" onClick={(evt) => {
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
                    ToastStore.success('Added to Cart')
                  }}>Add To Cart</button>
              </div>
                
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




