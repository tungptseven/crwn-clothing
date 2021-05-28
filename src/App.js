import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Header from './components/header/header.component';
import AuthenticationPage from './pages/authenticationPage/authenticationPage.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action'

class App extends React.Component {
  unsubcribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })

          console.log(this.state);
        })
      }

      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<AuthenticationPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);