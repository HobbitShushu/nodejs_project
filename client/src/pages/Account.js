import React, { Component } from 'react'

import LoginForm from '../components/account/LoginForm'
import { Redirect } from 'react-router-dom';

import styles from '../css/home.module.css'
import { prototype } from 'module';



//import queryString from 'query-string'

class Account extends Component{
    //const query = queryString.parse()
    constructor() {
        super();
        console.log("Account constructor ")
        this.state = {
            username: '',
            name: '',
            password: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleLogin(user) {
        this.setState({name: user})
        //return (<Redirect to={"/" + user}/>)
        //                {name && (<Redirect to={"/" + name}/>)} 

    }
// <LoginForm handleLogin={this.handleLogin}/>
    render() {
        const { name } = this.state
        return (
            <div className={styles.box}>
               <LoginForm/>
            </div>
        );
    }
};

export default Account;
