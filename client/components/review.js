import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {fetchBabies, babiesThunk, fetchOneBaby, getBabyCategory, getSearchResults, fetchAllUsers, postReview} from '../store'

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
        },
        handleReviewSubmit (evt) {
            const rating = evt.target.rating.value
            const text = evt.target.description.value
            const userId = store.getState().user.id
            const babyId = store.getState().babies.id
            dispatch(postReview({rating, text, babyId, userId}))
        }

    }
}

export const review = (props) => {

    const {isLoggedIn} = props
    let thisBaby = props.babies

    return (
        <div>
        <h3>Reviews and high praise for {thisBaby.name}</h3>
        {thisBaby && thisBaby.reviews &&
            <div>{thisBaby.reviews.map(review => {
                return (
                    <div key={review.id}>
                       <h4>Stars: { review.rating } </h4>
                       {/* <p>{this.Baby.reviews</p> */}
                       <p>TEXT: {review.text}</p>
                    </div>
                )
            })}</div>
        }

        {/* add review form */}

        <div>
        {
         (props.user.id)
            ? <div>
              {/* The form will render if user is logged in */}
              <h3>Add Your Own Review for {thisBaby.name}</h3>
                <form onSubmit={props.handleReviewSubmit} name="newReview">
                    <h4>Rating: </h4><input
                        name="rating"
                        type="text"
                        placeholder="Enter A Rating Between 1 and 5" />
                    <h4>Description: </h4><input
                        name="description"
                        type="text"
                        placeholder="Enter Your Review" />
                    <button type="submit">Add Review</button>
                </form>
            </div>
            : <div >
                {/* the message will render if user is not logged in */}
              <h1>Please Log In to Add A Review</h1>
            </div>

        }
        </div>

        </div>


    )
}

const ReviewContainer = connect(mapStateProps, mapDispatchProps)(review)
export default withRouter(ReviewContainer)
