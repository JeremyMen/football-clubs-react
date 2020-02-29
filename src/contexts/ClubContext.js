import React, { createContext, Component } from 'react';

const ClubContext = createContext()

export class ClubContextProvider extends Component {
  state = { 
    myClub: JSON.parse(localStorage.getItem('myClub')),
    currentClub: JSON.parse(localStorage.getItem('currentClub'))

  }

  setMyClub = (myClub) => {
    localStorage.setItem('myClub', myClub ? JSON.stringify(myClub) : null)
    this.setState({ myClub })
  }

  setCurrentClub = (currentClub) => {
    localStorage.setItem('currentClub', currentClub ? JSON.stringify(currentClub) : null)
    this.setState({ currentClub })
  }

  render() { 
    const value = {
      myClub: this.state.myClub,
      setMyClub: this.setMyClub,
      currentClub: this.state.currentClub,
      setCurrentClub: this.setCurrentClub
    }  

    return ( 
      <ClubContext.Provider value={ value }>
        { this.props.children }
      </ClubContext.Provider>
    )
  }
}

export const WithClubConsumer = (WrappedComponent) => (props) => (
  <ClubContext.Consumer>
    {(authProps) => (<WrappedComponent {...props} {...authProps} />)}
  </ClubContext.Consumer>
)
 
export default ClubContextProvider;