import {Component} from 'react'
import './index.css'
import Header from '../Header'

class TravelCardDetails extends Component {
  state = {
    courseData: [],
  }

  componentDidMount() {
    this.getTravelCardDetails()
  }

  getTravelCardDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const course = data.course_details
    const courseDetails = {
      id: course.id,
      description: course.description,
      imageUrl: course.image_url,
      name: course.name,
    }
    this.setState({courseData: courseDetails})
  }

  render() {
    const {courseData} = this.state
    const {name, imageUrl, description} = courseData
    return (
      <div className="techCardDetailsRoute">
        <Header />
        <div className="tech-card-container">
          <div className="tech-card-details">
            <img className="image" src={imageUrl} alt={name} />
            <div className="description-container">
              <h1 className="name">{name}</h1>
              <p className="description">{description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default TravelCardDetails
