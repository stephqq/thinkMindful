import React, { Component, Fragment } from 'react';
import firebase, { auth } from './scripts/firebase';
import * as firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    })
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
        })
      })
  }

  render() {
    return (
      <Fragment>
        <Header 
          userDetails={this.state.user}
          logOut={this.logout}
        />
        {
          this.state.user
            ?
            <Fragment>
              <Main user={auth.currentUser} />
            </Fragment>
            :
            <main className="wrapper">
              <section className="logInSection">
                <div className="logInContainer">
                  <p>Welcome to think mindful! This is a CBT companion web application where you can keep a journal of your thought records.</p>
                  <p>For a demo of this app please use the following credentials:</p>
                  <p>username: demothinkmindful@gmail.com</p>
                  <p>password: demojuno</p>
                </div>
                <div className="logInContainer">
                  <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                </div>
              </section>
            </main>
        }
        <Footer />
      </Fragment>
    )
  }
}

export default App;