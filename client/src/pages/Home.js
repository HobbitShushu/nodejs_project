import React, { Component } from 'react';

import styles from "../css/home.module.css"
import LoginButton from '../components/home/LoginButton'
import SignupButton from '../components/home/SignupButton'

class Home extends Component {
  
  constructor() {
    super();
    console.log("HOME PAGE CONSTRUCT")
  }

  render() {
    return (
      <div className={styles.homeBox}>  
        <h3>Home</h3>
        <LoginButton/>
        <SignupButton/>
      </div>
    
    );
  }
}

export default Home;
