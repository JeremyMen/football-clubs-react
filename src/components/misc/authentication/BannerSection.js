import React from 'react'
import '../../../stylesheets/BannerSection.css'


const BannerSection = ({ title, description }) => {
  return(
    <div className="BannerSection p120">
      <div className="container">
        <div className="banner-text">
          <h2>{ title }</h2>
          <p>{ description }</p>
        </div>
      </div>
    </div>
  )
}

export default BannerSection