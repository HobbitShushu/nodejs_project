import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { LoginConsumer } from '../../context/LoginContext'

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {            
            username: '',
            name: '',
            login: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const data = {}

        data['username'] = event.target.username.value
        data['password'] = event.target.password.value
        
        fetch('/account', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status === 200){
                res = res.json()
                .then(res => {
                    this.setState({
                        username: res.result.username,
                        name: res.result.name,
                        login: true
                    })
                    this.props.setValue(this.state)
                })
            }
        })
    }

    render() {
        const { login } = this.state
        const { name } = this.state
        return (
            <div>
                {login && (<Redirect to={{pathname:"/user/" + name, state:{name:name}}}/>)}
                <form id="Account-form" onSubmit={this.handleSubmit}>
                    <label>Enter user id</label>
                    <br/>
                    <input type="text" name="username" placeholder="username or email"/>
                    <br/>
                    <label>Enter Password</label>
                    <br/>
                    <input type="password" name="password" placeholder="password"/>
                    <br/>
                    <button type="submit" value="Submit">Login</button>
                </form>
            </div>
        )
    }
}

// Consumer 를 사용하여 context 값을 전달해준 컨테이너 컴포넌트
const SendsContainer = () => (
    <LoginConsumer>
      {
        ({state, actions}) => (
          <LoginForm 
            value = { state.name }
            setValue = { actions.setValue }
          />
        )
      }
    </LoginConsumer>
  )
  
// :: SendsContainer 를 내보내줌
//export default LoginForm;

export default SendsContainer;

