import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

const Home = (props)=>{

    return (
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="first-slide" src="fdsa" alt="First slide">
                    <div className="container">
                        <div className="carousel-caption text-left">
                            <h1>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}