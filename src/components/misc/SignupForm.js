import React, { Component } from 'react';
import '../../stylesheets/Form.css'
import FootballClubsService from '../../services/FootballClubsService'
import { Link } from 'react-router-dom';

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        fullName: '',
        username: '',
        email: '',
        password: ''
      },
      error: false
    }

  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    FootballClubsService.createUser({ ...this.state.data })
      .then(user => {
        this.setState({
          error: false
        })
        console.log(user)
      })
      .catch(() => {
        this.setState({
          error: true
        })
      })  
  }

  render() {
    const errorClassName = this.state.error ? 'is-invalid' : ''
    // const { pathname } = this.props
    // const loginForm = 
    //   <div>
    //     <div className="input-sec">
    //       <input 
    //         value={this.state.data.email}
    //         onChange={this.handleChange}
    //         className={`form-control ${errorClassName}`}
    //         type="text" 
    //         name="email" 
    //         placeholder="Email" 
    //       />
    //     </div>
    //     <div className="input-sec">
    //       <input 
    //         value={this.state.data.password}
    //         onChange={this.handleChange}
    //         className={`form-control ${errorClassName}`}
    //         type="Password" 
    //         name="password" 
    //         placeholder="Password" 
    //       />
    //     </div>
    //   </div>


    // const registerForm = 
    //   <div> 
    //     { loginForm }
    //     <div className="input-sec">
    //     <input 
    //       value={this.state.data.fullName}
    //       onChange={this.handleChange}
    //       className={`form-control ${errorClassName}`}
    //       type="text" 
    //       name="fullName" 
    //       placeholder="Full name" 
    //     />
    //   </div>
    //   <div className="input-sec">
    //     <input 
    //       value={this.state.data.username}
    //       onChange={this.handleChange}
    //       className={`form-control ${errorClassName}`}
    //       type="text" 
    //       name="username" 
    //       placeholder="Username" 
    //     />
    //   </div>
    // </div>

    // if (pathname === '/register') {
    //   return (
    //     <div className="Form">
    //       <div className="hd-lg">
    //         <img src="#logoFC" alt="" />
    //         <span>Register your Football Clubs account</span>
    //       </div>

    //       <div className="user-account-pr">
    //         <form onSubmit={this.handleSubmit}>
    //           { registerForm }
    //           <div className="input-sec mb-0">
    //             <button type="submit">Signup</button>
    //           </div>
    //         </form>
    //       </div>

    //       <div className="fr-ps">
		// 		    <h1>Already have an account? <Link to="/login">Signup here.</Link></h1>
		// 	    </div>
    //     </div>
    //   )
    // } else if (pathname === '/login') {
    //   return (
    //     <div className="Form">
    //       <div className="hd-lg">
    //         <img src="#logoFC" alt="" />
    //         <span>Log into your Football Clubs account</span>
    //       </div>

    //       <div className="user-account-pr">
    //         <form onSubmit={this.handleSubmit}>
    //           { loginForm }
    //         <div className="input-sec mb-0">
    //           <button type="submit">Login</button>
    //         </div>
    //         </form>
    //       </div>

    //       <div className="fr-ps">
		// 		    <h1>Don’t have an account? <Link to="/register">Signup here.</Link></h1>
		// 	    </div>
    //     </div>
    //   )
    // }
    return(
      <div className="Form">
        <div className="hd-lg">
          <img src="#logoFC" alt="" />
          <span>Register your Football Clubs account</span>
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
                value={this.state.data.username}
                onChange={this.handleChange}
                className={`form-control ${errorClassName}`}
                type="text" 
                name="username" 
                placeholder="Username" 
              />
            </div>
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
            <div className="input-sec mb-0">
              <button type="submit">Signup</button>
            </div>
          </form>
        </div>

        <div className="fr-ps">
				  <h1>Don’t have an account? <Link to="/login">Signup here.</Link></h1>
			  </div>
      </div>
    )
  }
}

export default SignupForm