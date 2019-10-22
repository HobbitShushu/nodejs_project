import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import style from '../../css/home.module.css'

class LoginButton extends Component {
    constructor(props) {
        super(props);
        console.log("loginButton construct")
        
        this.state = { clicked: false }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        console.log("Login Button is clicked")
        this.setState({ clicked: true })
    }
    
    render() {
        const { clicked } = this.state
        return (
            <div>
                {clicked && (<Redirect to="/account/login"/>)}
                <button onClick = {this.handleClick}>LOGIN</button>
            </div>
        )
    }
}

export default LoginButton;
