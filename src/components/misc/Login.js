import React from 'react'
import BannerSection from './BannerSection'
import SignupAndSigninForm from './SignupAndSigninForm'
import '../../stylesheets/Login.css'
import { Redirect } from 'react-router-dom'
import { WithAuthConsumer } from '../../contexts/AuthContext'

const Login = (props) => {
  if (props.currentUser) {
    return <Redirect to="/Home"/>
  }
  return(
    <div className="Login wrapper">
      <section>
        <BannerSection
          title="Sign In"
          description="Please sign in to have access to all the 
            Football Clubs and many more."
        />
      </section>
      <section>
        <SignupAndSigninForm 
          pathname={ props.location.pathname }
        />
      </section>
    </div>
  )
}

export default WithAuthConsumer(Login)