import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import store, {babiesThunk} from '../store'

function mapStateProps(state){
  return {
    babies: state.babies
  }
}
function mapDispatchProps(dispatch){
  return {
    loadData (){
      dispatch(babiesThunk())
    }
  }
}

export const allBabies = (props) => {
  const babies = props.babies;
  return (
    <div>
      We will put the beanie babies here
      <div>
      {babies && babies.map(baby => {
        return(
          <Link to={`/products/${baby.id}`} key={baby.id} >
          <div >
            <h3>{baby.name}</h3>
            <img src={ baby.imageUrl } />
          </div>
          </Link>
        )
      })}
      </div>
    </div>
  )
}

const AllBabiesContainer = connect(mapStateProps, mapDispatchProps)(allBabies)
export default withRouter(AllBabiesContainer)

