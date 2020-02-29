import React from 'react';
import BannerSection from './BannerSection';
import { Link } from 'react-router-dom';

const Validation = () => {
  return ( 
    <div className="Validation">
      <BannerSection 
        title="Validation"
        description="You are almost there!"
      />

      <div className="hd-lg mt-4 mb-4">
        <img src="../../../../footballclubsLogo_Black.png" alt="logo" className="mw-170"/>
        <span>One last step: we've sent you an email to verify your account.</span>
      </div>

      <p>
        <Link to="/login">login</Link>
      </p>
    </div>
   );
}
 
export default Validation;