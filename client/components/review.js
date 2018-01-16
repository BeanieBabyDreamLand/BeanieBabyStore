import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {fetchBabies, babiesThunk, fetchOneBaby, getBabyCategory, getSearchResults, fetchAllUsers, fetchReviews, postReview, writeReview} from '../store'
import {ToastContainer, ToastStore} from 'react-toasts'

function mapStateProps(state){
    return {
      babies: state.babies,
      user: state.user,
      input: state.reviewInput,
      reviews: state.review,
      clearInput: ''
    }
}

function mapDispatchProps(dispatch){
    return {
        loadData (){
            dispatch(fetchAllUsers())
            dispatch(fetchOneBaby(this.req.params.id))
            dispatch(fetchReviews())
        },
        handleReviewSubmit (evt) {
            evt.preventDefault()
            const rating = evt.target.rating.value
            const text = evt.target.description.value
            const userId = store.getState().user.id
            const babyId = store.getState().babies.id


            dispatch(postReview({rating, text, babyId, userId})).
            then(() => dispatch(fetchReviews()) )
            evt.target.description.value = ''

        },
        handleChange (evt) {
            dispatch(writeReview(evt.target.value))
        }
    }
}
export class review extends Component {

    componentWillMount () {
        const fetchThisBaby = fetchOneBaby(this.props.match.params.id)
        store.dispatch(fetchThisBaby)
        store.dispatch(fetchReviews())
    }

    render () {
        let thisBaby = this.props.babies
        let handleChange = this.props.handleChange
        let input = this.props.input
        let theseReviews = this.props.reviews

        console.log('theseReviews: ', theseReviews)
    return (

        <div className="review-container">

            <br />
            <ToastContainer store={ToastStore} />
        <h3 className="reviews-title">Reviews and high praise for {thisBaby.name}</h3>
        <br />
        {thisBaby && theseReviews && theseReviews.length &&
            <div className="each-review">{theseReviews.map(thisReview => {
                if ( thisReview.babyId === thisBaby.id ){
                return (
                    <div key={thisReview.id}>
                       <h5>{thisReview.user.fullname} Gave {thisBaby.name} { thisReview.rating } Stars on {new Date(thisReview.updatedAt).toDateString()}</h5>
                       <p className="review-text"><strong>{thisReview.user.fullname.split(' ')[0]} says: </strong>{thisReview.text}</p>
                    </div>
                )}
            })}

            </div>

        }

        {/* add review form */}

        <div>
        <br />

        {
         (this.props.user.id)
            ? <div>
              {/* The form will render if user is logged in */}
              <h3 className="reviews-title">Add Your Own Review for {thisBaby.name}</h3>
              <br />
                <div className="each-new-review">
                <form onSubmit={this.props.handleReviewSubmit} name="submit-form">
                <h4>Rating: </h4>
                    <select name="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br />
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
                    onClick={() => ToastStore.success('Review Added')}
                    >Add Review</button>
                </form>
                </div>

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
