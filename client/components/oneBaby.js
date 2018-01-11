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
      }
    }
  }
  
  export class oneBaby extends Component {
    componentDidMount(){
        const oneBabyThunk = fetchOneBaby(this.props.match.params.id)
        store.dispatch(oneBabyThunk)
    }

    render(){
        return (
        <div>
        
        </div>
        )
    }
  }
  
  const oneBabyContainer = connect(mapStateProps, mapDispatchProps)(oneBaby)
  export default withRouter(oneBabyContainer)
  
  