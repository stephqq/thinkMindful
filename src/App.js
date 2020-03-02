import React, { Component, Fragment } from 'react';
import firebase, { auth, provider } from './scripts/firebase';
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

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        })
      })
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
          logIn={this.login}
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
              <section>
                <p>hi i need to make some outside facing content about this project.</p>
              </section>
            </main>
        }
        <Footer />
      </Fragment>
    )
  }
}

export default App;