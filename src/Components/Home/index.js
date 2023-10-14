import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelCard from '../TravelCard/index'
import './index.css'

import Header from '../Header/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    placesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    this.getTravelData()
  }

  getTravelData = async () => {
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        placesList: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {placesList} = this.state
    return (
      <div className="travelContainer">
        <h1>Courses</h1>
        <ul className="travelList">
          {placesList.map(eachTech => (
            <li key={eachTech.id}>
              <TravelCard eachTech={eachTech} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onClickRetry = () => {
    this.getTravelData()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry()}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" height="20" color="black" />
    </div>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="main-container">
        <Header />
        {this.renderAllViews()}
      </div>
    )
  }
}

export default Home
