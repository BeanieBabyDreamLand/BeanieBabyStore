import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {babiesThunk, fetchOneBaby} from '../store'
import { Review } from './index'

function mapStateProps(state){
    return {
      babies: state.babies
    }
  }
  function mapDispatchProps(dispatch){
    return {
      loadData (){
        dispatch(fetchOneBaby(this.req.params.id))
      },
      handleSubmit (evt, babyId){
        evt.preventDefault()
        console.log('here is add to cart functionality')
        console.log('babyId is ', babyId)
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

    componentWillUnmount() {
      const fetchBabies = babiesThunk()
      store.dispatch(fetchBabies)
    }

    render(){
      console.log('is this one baby????', this.props)
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

              <button type="submit" onClick={(evt)=>{this.props.handleSubmit(evt, baby)}}>Add To Cart</button>

            <Review props={this.props}/>
          </div>
          }
        </div>
        )
    }
  }

  const oneBabyContainer = connect(mapStateProps, mapDispatchProps)(oneBaby)
  export default withRouter(oneBabyContainer)

