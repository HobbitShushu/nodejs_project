import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import style from '../../css/home.module.css'

class SignupButton extends Component {
    constructor(props) {
        super(props);
        console.log("signupButton construct")
        
        this.state = { clicked: false }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        console.log("Signup Butotn clicked")

        this.setState({ clicked: true })
    }

    render() {
        const { clicked } = this.state
        return (
            <div>
                {clicked && (<Redirect to="/account/regist"/>)}
                <button onClick = {this.handleClick}>SignUp</button>
            </div>
        )
    }
}

export default SignupButton;
