import React, { Component } from 'react'
import Navbar from '../misc/Navbar'
import { WithAuthConsumer } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import FootballClubsService from '../../services/FootballClubsService';
import '../../stylesheets/Edit.css'
import { WithClubConsumer } from '../../contexts/ClubContext';

class Edit extends Component {
  state = {  
    data: {
      name: '',
      city: '',
      address: '',
      emblem: ''
    },
    error: false,
    errorMessage: ''
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

    const { data } = this.state
    const formData = new FormData()
    
    formData.append('name', data.name)
    formData.append('city', data.city)
    formData.append('address', data.address)
    formData.append('emblem', data.emblem)

    FootballClubsService.updateClub(this.props.currentClub.username, formData)
      .then((club) => {
        this.setState({
          error: false
        })
        this.props.setMyClub(club.data)
        this.props.setCurrentClub(club.data)
        this.props.history.push(`/clubs/${this.props.currentClub.username}`)
      })
  }

  deleteAccount = (event) => {
    event.preventDefault()

    FootballClubsService.deleteClub(this.props.currentClub.username)
      .then(() => {
        this.setState({
          error: false
        })
        this.props.setMyClub()
        this.props.history.push(`/clubs`)
      })
      .catch(err => {
        this.setState({
          errorMessage: err.response.data.message
        })
      })

  }

  componentDidMount = () => {
    const { currentClub } = this.props

    FootballClubsService.getClub( currentClub.username )
      .then(club => {
        this.setState({
          data: {
            name: club.data.name,
            city: club.data.city,
            address: club.data.address,
            emblem: club.data.emblem,
          }
        })

      })

  }
  render() { 
    const errorClassName = this.state.error ? 'is-invalid' : ''

    const errorMessage = this.state.errorMessage ? 
      this.state.errorMessage :
      ''

    const admin = this.props.currentClub.admin[0]
    const userId = this.props.currentUser.id
    
    if (admin !== userId) {
      return <Redirect to={`/clubs/${this.props.currentClub.username}`} />
    } else {
      return (  
        
        <div className="Edit container">
          <Navbar />
          <div className="hd-lg">
            <span>Edit your Football Club</span>
          </div>
          <div className="user-account-pr">
            <form onSubmit={this.handleSubmit}>
              <div className="input-sec">
                <input 
                  value={this.state.data.name}
                  onChange={this.handleChange}
                  className={`form-control ${errorClassName}`}
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                />
              </div>
              <div className="input-sec">
                <input 
                  value={this.state.data.city}
                  onChange={this.handleChange}
                  className={`form-control ${errorClassName}`}
                  type="text" 
                  name="city" 
                  placeholder="City" 
                />
              </div>
              <div className="input-sec">
                <input 
                  value={this.state.data.address}
                  onChange={this.handleChange}
                  className={`form-control ${errorClassName}`}
                  type="text" 
                  name="address" 
                  placeholder="Address" 
                />
              </div>
              <div className="input-sec d-flex justify-content-between">
                <label htmlFor="profilePicture">Emblem</label>
                <input
                  onChange={this.handleChange}
                  name="emblem"
                  type="file"
                  className={`form-control ${errorClassName} mw-165`}
                  id="emblem"
                />
              </div>
              <div className="input-sec mb-0">
                <button type="submit">Edit</button>
              </div>
            </form>
            <form onClick={this.deleteAccount}>
              <div className="input-sec mb-0">
                <button className={`form-control ${errorClassName}`} type="submit">Delete</button>
              </div>
              <div className="color-red">
                {errorMessage}
              </div>
            </form>
          </div>
        </div>
      );
    }

    
  }
}
 
export default WithClubConsumer(WithAuthConsumer(Edit));