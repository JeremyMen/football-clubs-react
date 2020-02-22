import React from 'react'
import BannerSection from './BannerSection'
import LoginForm from './LoginForm'
import '../../stylesheets/Login.css'

const Login = (props) => {
  console.log(props)
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
        <LoginForm />
      </section>
    </div>
  )
}

export default Login