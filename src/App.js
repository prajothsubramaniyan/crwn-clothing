import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import {setCurrentUser } from './redux/user/user.action';
import {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {  
    const {setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapSnot => {
          setCurrentUser({
            currentUser: {
              id: snapSnot.id,
              ...snapSnot.data()
            }
          });
          
        });
        
      }
      else
      {
        setCurrentUser(userAuth)
      }
    })    
  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
      <Header />    
        <Switch>
          <Route exact path ="/" component ={ HomePage }/>     
          <Route path ="/shop" component ={ ShopPage }/>    
          <Route exact path ="/checkout" component ={ CheckoutPage }/>    
          <Route exact path ="/signin" render ={() => this.props.currentUser ? (<Redirect to ='/'  />) : (<SignInAndSignUpPage />)} />     
        </Switch>    
      </div>
    );
  } 
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser  
});

const mapsDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapsDispatchToProps)(App);
