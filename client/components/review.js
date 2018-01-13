import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {fetchBabies, babiesThunk, fetchOneBaby, getBabyCategory, getSearchResults, fetchAllUsers} from '../store'

function mapStateProps(state){
  return {
    babies: state.babies,
    user: state.user
  }
}
function mapDispatchProps(dispatch){
    return {
        loadData (){
            dispatch(fetchAllUsers())
            dispatch(fetchOneBaby(this.req.params.id))
        }

    }
}

export const review = (props) => {
    console.log('!!!!',props.babies, props.match.params)
    let users = props.users
    console.log(users)
    let thisBaby = props.babies
    return (
        <div>
        <h3>Reviews and high praise for {thisBaby.name}</h3>
        {thisBaby && thisBaby.reviews &&
            //console.log('this baby review',thisBaby.reviews[0])
            <div>{thisBaby.reviews.map(review => {
                return (
                    <div key={review.id}>
                       <h4>Stars: { review.rating } </h4>
                       {/* <p>{this.Baby.reviews</p> */}
                    </div>
                )
            })}</div>
        }
        </div>
    )
}

const ReviewContainer = connect(mapStateProps, mapDispatchProps)(review)
export default withRouter(ReviewContainer)
