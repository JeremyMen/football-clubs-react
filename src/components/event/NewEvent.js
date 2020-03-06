import React, { Component } from 'react'
import '../../stylesheets/NewEvent.css'
import FootballClubsService from '../../services/FootballClubsService'
import { WithClubConsumer } from '../../contexts/ClubContext'

class NewEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      data: {
        title: '',
        description: '',
        date: '',
        time: '',
        image: ''
      },
      error: ''
    }
  }

  handleChange = (event) => {
    const { name, value, files } = event.target

    this.setState({
      data: {
        ...this.state.data,
        [name]: files ? files[0] : value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    // const { data } = this.state
    // const formData = new FormData()

    // formData.append('title', data.title)
    // formData.append('description', data.description)
    // formData.append('date', data.date)
    // formData.append('time', data.time)
    // formData.append('image', data.image)

    FootballClubsService.createEvent(this.state.data, this.props.currentClub.username)
      .then(() => {
        this.setState({
          error: false
        })
        window.location.reload()
      })
  }

  render() { 

    const {  
      title,
      description,
      date,
      time,
      // image
    } = this.state.data

    return (  
      <div className="NewEvent mw-100">
        <form onSubmit={this.handleSubmit} className="card w-fit-con h-fit-con mw-300 h-350">
          <h5 className="m-3"><b>New Event</b></h5>
          <div className="p-3">
            <div className="form-group">            
              <input 
                value={ title }
                onChange={ this.handleChange }
                name="title" 
                type="text" 
                className="form-control input-form" 
                id="title" 
                placeholder="Event Title" 
              />
            </div>
            <div className="form-group">              
              <textarea id="" rows="4" cols="30" 
                value={ description }
                onChange={this.handleChange}
                className={`form-control input-form`}
                type="text" 
                name="description" 
                placeholder="Description" 
              />
            </div>
              <div className="form-group">              
                <input 
                  value={ date } 
                  onChange={this.handleChange}
                  name="date"
                  type="date" 
                  className="form-control input-form" 
                  id="date" 
                  placeholder="Date" 
                />
              </div>
              <div className="form-group">              
                <input 
                  value={ time }
                  onChange={this.handleChange}
                  name="time"
                  type="time"
                  min="00:00"
                  max="23:00" 
                  className="form-control input-form" 
                  id="time" 
                  placeholder="Time" 
                />
              </div>
              {/* <div className="custom-file">
                <input 
                  value={ image }
                  onChange={this.handleChange}
                  type="file" 
                  className="custom-file-input" 
                  id="customFile" 
                />
                <label className="custom-file-label d-flex" htmlFor="customFile">Choose image</label>
              </div> */}
            <div>
              <button onClick={ this.props.setEvents} className="button mt-4" type="submit">Create event</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
 
export default WithClubConsumer(NewEvent);