import React, { Component } from 'react'
import Navbar from '../misc/Navbar'
import { WithAuthConsumer } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import FootballClubsService from '../../services/FootballClubsService';
import '../../stylesheets/Edit.css'
import '../../stylesheets/Edit.css'

class Edit extends Component {
  state = {  
    data: {
      fullName: '',
      password: '',
      profilePicture: ''
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
    
    formData.append('fullName', data.fullName)
    formData.append('password', data.password)
    formData.append('profilePicture', data.profilePicture)

    FootballClubsService.updateUser(this.props.currentUser.username, formData)
      .then((user) => {
        this.setState({
          error: false
        })
        this.props.setUser(user.data)
        this.props.history.push(`/users/${this.props.currentUser.username}`)
      })
  }

  deleteAccount = (event) => {
    event.preventDefault()

    FootballClubsService.deleteUser(this.props.currentUser.username)
      .then(() => {
        this.setState({
          error: false
        })
        this.props.logout()
        this.props.history.push(`/login`)
      })
      .catch(err => {
        this.setState({
          errorMessage: err.response.data.message
        })
      })

  }

  componentDidMount = () => {
    const { currentUser } = this.props

    FootballClubsService.getUser( currentUser.username )
      .then(user => {
        this.setState({
          data: {
            fullName: user.data.fullName,
            profilePicture: user.data.profilePicture,
          }
        })

      })

  }
  render() { 
    const errorClassName = this.state.error ? 'is-invalid' : ''

    const errorMessage = this.state.errorMessage ? 
      this.state.errorMessage :
      ''

    const { username } = this.props.match.params

    if (this.props.currentUser.username !== username) {
      return <Redirect to="/clubs"/>
    } else {
      return (  
        
        <div className="Edit">
          <Navbar />
          <div className="hd-lg container pt-5">
            <img src={ this.props.currentUser.profilePicture } alt="logo"  className="rounded mw-170"/>
            <span>Edit your profile</span>
          </div>
          <div className="user-account-pr">
            <form onSubmit={this.handleSubmit}>
              <div className="input-sec">
                <input 
                  value={this.state.data.fullName}
                  onChange={this.handleChange}
                  className={`form-control ${errorClassName}`}
                  type="text" 
                  name="fullName" 
                  placeholder="Full name" 
                />
              </div>
              <div className="input-sec">
                <input 
                  value={this.state.data.password}
                  onChange={this.handleChange}
                  className={`form-control ${errorClassName}`}
                  type="Password" 
                  name="password" 
                  placeholder="Password" 
                />
              </div>
              <div className="input-sec custom-file">
                <label className="custom-file-label d-flex" htmlFor="profilePicture">Profile picture</label>
                <input
                  onChange={this.handleChange}
                  name="profilePicture"
                  type="file"
                  className={`custom-file-input form-control ${errorClassName}`}
                  id="profilePicture"
                />
              </div>
              <div className="input-sec mb-0 mt-2">
                <button type="submit">Edit</button>
              </div>
            </form>
              <div className="input-sec delete mb-5">
                <button onClick={this.deleteAccount} className={`bg-red color-white form-control ${errorClassName}`} type="submit">Delete</button>
              </div>
              <div className="color-red">
                {errorMessage}
              </div>
          </div>
        </div>
      );
    }

    
  }
}
 
export default WithAuthConsumer(Edit);