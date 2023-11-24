import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
// import TechEra from '../TechEra'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseData: [],
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const {fetchedData} = await response.json()
      const updatedData = fetchedData.course_details.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        imageUrl: eachCourse.image_url,
        description: eachCourse.description,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        courseData: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  //  onClickRetry = () => <Redirect to="/" />

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
      <Link to="/">
        <button
          className="failure-retry-btn"
          type="button"
          onClick={this.onClickRetry}
        >
          Retry
        </button>
      </Link>
    </div>
  )

  OnRenderingLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRenderingSuccess = () => {
    const {courseData} = this.state
    const {name, imageUrl, description} = courseData
    return (
      <div className="courses-details-container">
        <img src={imageUrl} alt={name} className="course-details-image" />
        <div className="courses-details">
          <h1 className="courses-details-heading">{name}</h1>
          <p className="courses-details-description">{description}</p>
        </div>
      </div>
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
        <div className="coursesDetails">{this.RenderingApiStatus()}</div>
      </>
    )
  }
}

export default CourseDetails
