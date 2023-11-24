import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TechCourses from '../TechCourses'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEra extends Component {
  state = {
    techCoursesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTechEraCourses()
  }

  getTechEraCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))

      this.setState({
        techCoursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.OnRenderingSuccess()
  }

  OnRenderingFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-retry-btn"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  OnRenderingLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  OnRenderingSuccess = () => {
    const {techCoursesList} = this.state
    return (
      <ul className="ul-tech-courses-list">
        {techCoursesList.map(eachCourses => (
          <TechCourses key={eachCourses.id} courseDetails={eachCourses} />
        ))}
      </ul>
    )
  }

  RenderingApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.OnRenderingSuccess()
      case apiStatusConstants.failure:
        return this.OnRenderingFailure()
      case apiStatusConstants.inProgress:
        return this.OnRenderingLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <h1 className="courses-heading">Courses</h1>
        <div className="app-container">{this.RenderingApiStatus()}</div>
      </>
    )
  }
}

export default TechEra
