import React from 'react';
import BannerSection from './BannerSection';
import '../../stylesheets/Signup.css'
import SignupAndSigninForm from './SignupAndSigninForm';
import { Redirect } from 'react-router-dom';
import { WithAuthConsumer } from '../../contexts/AuthContext';

const Signup = (props) => {
  if (props.currentUser) {
    return <Redirect to="/Home"/>
  }
  return(
    <div className="Signup wrapper">
      <section>
        <BannerSection
          title="Register"
          description="Please register to have access to all the 
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

export default WithAuthConsumer(Signup)