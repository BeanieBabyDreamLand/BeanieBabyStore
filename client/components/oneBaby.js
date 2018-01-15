import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {babiesThunk, fetchOneBaby, addToCartThunk, updateCartThunk, getInitialCartThunk} from '../store'
import { Review } from './index'

function mapStateProps(state){
    return {
      babies: state.babies,
      cart: state.cart,
      order: state.order,
      user: state.user
    }
  }
  function mapDispatchProps(dispatch){
    return {
      loadData (){
        dispatch(fetchOneBaby(this.req.params.id))
      },
      updateCart (evt, lineItemId){
        evt.preventDefault()
        const currentQuant = this.cart.find(elem => {
          return elem.babyId === +this.match.params.id
        }).quantity
        dispatch(updateCartThunk({price: this.babies.price, quantity: currentQuant + 1, userId: this.user.id, babyId: this.match.params.id, orderId: this.order.id}, lineItemId))
        .then(() => {
          dispatch(getInitialCartThunk())
        })
      },
      createLineItem (evt){
        evt.preventDefault()
        dispatch(addToCartThunk({price: this.babies.price, quantity: 1, userId: this.user.id, babyId: this.match.params.id, orderId: this.order.id}))
        .then(() => {
          dispatch(getInitialCartThunk())
        })
      }
    }
  }

  export class oneBaby extends Component {
    componentWillMount(){
      const oneBabyThunk = fetchOneBaby(this.props.match.params.id)
        store.dispatch(oneBabyThunk)
    }
    componentDidMount(){
      const oneBabyThunk = fetchOneBaby(this.props.match.params.id)
      store.dispatch(oneBabyThunk)
    }

    componentWillUnmount(){
      const fetchBabies = babiesThunk()
      store.dispatch(fetchBabies)
    }

    render(){
      const baby = this.props.babies

        return (
        <div>
          { baby &&
          <div>
            <h2>{baby.name}</h2>
            <p>{baby.poem}</p>
            <p>{baby.price}</p>
            <img src={baby.imageUrl} />
            <h5>This baby is {baby.category}</h5>

              <button type="submit" onClick={(evt) => {
                let updateCart = false, lineItemId
        //---Test if this baby is already in the cart ---\\
                this.props.cart.forEach(lineItem => {
                  if (lineItem.babyId === baby.id){
                    updateCart = true
                    lineItemId = lineItem.id
                  }
                })
                if (updateCart){
                this.props.updateCart(evt, lineItemId)
                }
                else { 
                this.props.createLineItem(evt)}
                }}>Add To Cart</button>

            <Review props={this.props}/>
          </div>
          }
        </div>
        )
    }
  }

  const oneBabyContainer = connect(mapStateProps, mapDispatchProps)(oneBaby)
  export default withRouter(oneBabyContainer)

