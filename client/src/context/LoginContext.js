import React, { Component, createContext} from 'react'

// Make context
const Context = createContext()

// return Provider and Consumer
const { Provider, Consumer: LoginConsumer } = Context

class LoginProvider extends Component { 
    state = {
        username: 'Guest',
        name: 'MOMO',
        login: false,
        userInfo: localStorage.userInfo
    }

    // Make Object to return Object included functions of change state
    actions = {
        setValue: (info) => {
            this.setState({
                username: info.username,
                name: info.name,
                login: info.login
            });
            this.setState({userInfo: this.state})
        }
    }

    render() {
        const { state, actions } = this
        // 'value' is value used in Provider
        // Make Object included state and actions
        const value = { state, actions }
        console.log({state})
        return (
            <Provider value={value}>
                { this.props.children }
            </Provider>
        )
    }
}

export {
    LoginProvider,
    LoginConsumer,
}