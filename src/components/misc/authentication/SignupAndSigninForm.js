import React, { Component } from 'react';
import '../../../stylesheets/Form.css'
import FootballClubsService from '../../../services/FootballClubsService'
import { Link, withRouter } from 'react-router-dom';
import { WithAuthConsumer } from '../../../contexts/AuthContext';

class SignupAndSigninForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        fullName: '',
        username: '',
        email: '',
        password: '',
        profilePicture: ''
      },
      error: false,
      errorMessage: ''
    }
    this._isMounted = false
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
    this._isMounted = true
    event.preventDefault()
    const { pathname } = this.props
    const { data } = this.state
    const formData = new FormData()
    
    formData.append('fullName', data.fullName)
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('profilePicture', data.profilePicture)

    if (pathname === '/register') {
      FootballClubsService.createUser(formData)
        .then(() => {
          this.setState({
            error: false
          })
        this.props.history.push('/validation')
        })
        .catch((err) => {
          this.setState({
            error: true,
            errorMessage: err
          })
        })  
    } else if (pathname === '/login'){
      FootballClubsService.login({ ...this.state.data })
      .then(user => {
        this.setState({
          error: false
        })
        this.props.setUser(user.data)
        this.props.setMyClub()
        this.props.setCurrentClub()
      })
      .catch((err) => {
        this.setState({
          error: true,
          errorMessage: err

        })
      }) 
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  render() {
    console.log(this.errorMessage)
    const errorClassName = this.state.error ? 'is-invalid' : ''
    const { pathname } = this.props
    // const errorMessage = this.state.errorMessage ? 
    //   this.state.errorMessage :
    //   ''

    const loginForm = 
      <div>
        <div className="input-sec">
          <input 
            value={this.state.data.email}
            onChange={this.handleChange}
            className={`form-control ${errorClassName}`}
            type="text" 
            name="email" 
            placeholder="Email" 
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
      </div>

    const registerForm = 
      <div> 
        
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
          value={this.state.data.username}
          onChange={this.handleChange}
          className={`form-control ${errorClassName}`}
          type="text" 
          name="username" 
          placeholder="Username" 
        />
      </div>

      { loginForm }

      <div className="input-sec custom-file d-flex">
        <label className="custom-file-label" htmlFor="profilePicture">Profile picture</label>
        <input
          onChange={this.handleChange}
          name="profilePicture"
          type="file"
          className={`custom-file-input form-control ${errorClassName} mw-165`}
          id="profilePicture"
        />
      </div>

    </div>

    if (pathname === '/register') {
      return (
        <div className="Form">
          <div className="hd-lg">
            <img src="../../../../footballclubsLogo_Black.png" alt="logo"  className="mw-170"/>
            <span>Register your Football Clubs account</span>
          </div>

          <div className="user-account-pr">
            <form onSubmit={this.handleSubmit}>
              { registerForm }
              <div className="input-sec mb-0">
                <button type="submit">Signup</button>
              </div>
              {/* <div className="color-red">
                {errorMessage}
              </div> */}
            </form>
          </div>

          <div className="fr-ps">
				    <h1>Already have an account? <Link to="/login">Sing in here.</Link></h1>
			    </div>
        </div>
      )
    } else if (pathname === '/login' || '/') {
      return (
        <div className="Form">
          <div className="hd-lg">
            <img src="../../../../footballclubsLogo_Black.png" alt="logo" className="mw-170"/>
            <span>Log into your Football Clubs account</span>
          </div>

          <div className="user-account-pr">
            <form onSubmit={this.handleSubmit}>
              { loginForm }
            <div className="input-sec mb-0">
              <button type="submit">Login</button>
            </div>
            {/* <div className="color-red">
              {errorMessage}
            </div> */}
            </form>
          </div>

          <div className="fr-ps">
				    <h1>Don’t have an account? <Link to="/register">Signup here.</Link></h1>
			    </div>
        </div>
      )
    }
  }
}

export default withRouter(WithAuthConsumer(SignupAndSigninForm))