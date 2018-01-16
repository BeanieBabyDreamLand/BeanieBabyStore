import React from 'react'
import {withRouter} from 'react-router-dom'

const Home = () => {

    return (
        <div id="myCarousel" className="carousel slide main" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="first-slide img-slide slide" src="http://www.tycollector.com/beanies/bb-images/bernie.jpg" alt="First slide" />
                    <div className="container">
                        <div className="carousel-caption text-left">
                            <h1>Bernie</h1>
                            <p>A beautiful baby!</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="second-slide img-slide slide" src="https://images-na.ssl-images-amazon.com/images/I/71E25QZTEVL.gif" alt="Second slide" />
                    <div className="container">
                        <div id="blue" className="carousel-caption text-left">
                            <h1>Bones</h1>
                            <p>A beautiful baby!</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="third-slide img-slide slide" src="http://www.tycollector.com/buddies/bud-images/mystic-9396-2.jpg" alt="Third slide" />
                    <div className="container">
                        <div className="carousel-caption text-left">
                            <h1>Mystic</h1>
                            <p>A beautiful baby!</p>
                        </div>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" hfer="#myCarousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
            <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            </a>
        </div>
    )
}

export default withRouter(Home)
