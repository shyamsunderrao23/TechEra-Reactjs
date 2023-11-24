import './index.css'

import {Link} from 'react-router-dom'

const TechCourses = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="li-tech-courses">
        <div className="courses-list">
          <img src={logoUrl} alt={name} className="course-logo" />
          <p className="course-name">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default TechCourses
