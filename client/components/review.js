import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {fetchBabies, babiesThunk, fetchOneBaby, getBabyCategory, getSearchResults, fetchAllUsers, fetchReviews, postReview, writeReview} from '../store'

function mapStateProps(state){
    return {
      babies: state.babies,
      user: state.user,
      input: state.reviewInput
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
            const userId = store.getState().user.id
            const babyId = store.getState().babies.id
            dispatch(postReview({rating, text, babyId, userId}))
        },
        handleChange (evt) {
            dispatch(writeReview(evt.target.value))
        }
    }
}
export class review extends Component {

    // componentWillMount () {
    //     const fetchBabies = babiesThunk()
    //     store.dispatch(fetchBabies)
    // }
    // componentDidMount(){
    //     const fetchBabies = babiesThunk()
    //     store.dispatch(fetchBabies)
    //   }

    //   componentWillUnmount(){
    //     const fetchBabies = babiesThunk()
    //     store.dispatch(fetchBabies)
    //   }

    render () {
        let thisBaby = this.props.babies
        let handleChange = this.props.handleChange
        let input = this.props.input

    return (
        <div>
        <h3>Reviews and high praise for {thisBaby.name}</h3>
        {thisBaby && thisBaby.reviews &&
            <div>{thisBaby.reviews.map(review => {
                return (
                    <div key={review.id}>
                       <h4>Stars: { review.rating } </h4>
                       <p>TEXT: {review.text}</p>
                    </div>
                )
            })}</div>
        }

        {/* add review form */}

        <div>
        <br />
        {
         (this.props.user.id)
            ? <div>
              {/* The form will render if user is logged in */}
              <h3>Add Your Own Review for {thisBaby.name}</h3>
                <form onSubmit={this.props.handleReviewSubmit} name="submit-form">
                <h4>Rating: </h4>
                    <select name="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                <h4>Description: </h4>
                    <input
                        name="description"
                        type="text"
                        value={input}
                        onChange={handleChange}
                        placeholder="Enter Your Review" />
                <button
                    type="submit"
                    disabled={!input || input.length < 15}
                    >Add Review</button>
                </form>
            </div>
            : <div >
                {/* this message will render if user is not logged in */}
              <h1>Please Log In to Add A Review</h1>
            </div>

        }
        </div>

        </div>

    )
    }
}

const ReviewContainer = connect(mapStateProps, mapDispatchProps)(review)
export default withRouter(ReviewContainer)
