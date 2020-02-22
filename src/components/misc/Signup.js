import React from 'react';
import BannerSection from './BannerSection';
import '../../stylesheets/Signup.css'
import SignupForm from './SignupForm';

const Signup = (props) => {
  console.log(props)
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
        <SignupForm pathname={ props.location.pathname }/>
      </section>
    </div>
  )
}

export default Signup