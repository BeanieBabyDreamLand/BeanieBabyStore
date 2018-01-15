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
            evt.preventDefault()
            const rating = evt.target.rating.value
            const text = evt.target.description.value
            const userId = evt.target.userId.value
            const babyId = evt.target.babyId.value
            dispatch(postReview({rating, text, babyId, userId}))
        }

    }
}

export const review = (props) => {


    const {isLoggedIn} = props
    console.log('props', props.babies, props.match.params)
    // let users = props.users
    // console.log('users', users)
    let thisBaby = props.babies
    let user = props.user.id
    let baby = thisBaby.id
    console.log('BABYID: ', thisBaby.id)
    console.log('USERID: ', props.user.id)

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
                       <p>TEXT: {review.text}</p>
                    </div>
                )
            })}</div>
        }

        {/* add review form */}

        <div>
        {
          isLoggedIn
            ? <div>
              {/* the message will render if user is not logged in */}
              <h1>Please Log In to Add A Review</h1>
            </div>
            : <div >
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
                    <input
                        name="userId"
                        type="text"
                        value={user} />
                    <input
                        name="babyId"
                        type="text"
                        value={baby} />
                    <button type="submit">Add Review</button>
                </form>
            </div>
        }
        </div>

        </div>


    )
}

const ReviewContainer = connect(mapStateProps, mapDispatchProps)(review)
export default withRouter(ReviewContainer)
