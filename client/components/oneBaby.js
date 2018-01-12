import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {babiesThunk, fetchOneBaby} from '../store'

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
      handleSubmit (evt){
        evt.preventDefault()
        console.log('here is add to cart functionality')
      }
    }
  }

  export class oneBaby extends Component {
    componentDidMount(){
        const oneBabyThunk = fetchOneBaby(this.props.match.params.id)
        store.dispatch(oneBabyThunk)
    }

    componentWillUnmount() {
      const fetchBabies = babiesThunk()
      store.dispatch(fetchBabies)
    }

    render(){
      console.log(this.props)
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
            <form onSubmit={this.props.handleSubmit}>
              <button type="submit" >Add To Cart</button>
            </form>
          </div>
          }
        </div>
        )
    }
  }

  const oneBabyContainer = connect(mapStateProps, mapDispatchProps)(oneBaby)
  export default withRouter(oneBabyContainer)

