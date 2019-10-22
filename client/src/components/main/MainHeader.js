import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { LoginConsumer } from '../../context/LoginContext'

import styles from '../../css/main.module.css'

class MainHeader extends Component {
    constructor() {
        super()
        console.log("Main Header Contrcuted")
        this.state = {
            username : '',
            url_name : ''
        }
    }
    componentDidMount() {
        if(this.props.username !== undefined)
            this.setState({url_name: this.props.username.url_name})
        else
            this.setState({url_name: window.location.pathname.split('/')[2]})        
    }
    render() {
        const {url_name} = this.state
        const pathname = window.location.pathname
        return (
            <div className={styles.main_header}>
                <LoginConsumer>
                    {
                        (login) => (
                            <div className={styles .header_userInfo}>
                                username : { login.state.name }
                                <br/>
                                name: { login.state.username }
                                <br/>
                                {login.state.login && 'Login'}
                                {!login.state.login && 'Need Login'}
                            </div>
                        )
                    }
                </LoginConsumer>
                <h1>Main Header</h1>
                <nav className={styles.main_header_nav}>
                    <Link to={ '/user/' + url_name }>Main</Link>
                    <Link to={ '/profile/' + url_name }>Profile</Link>
                    <Link to={ '/board/' + url_name}>Board</Link>
                    <Link to={ '/picture/' + url_name }>Picture</Link>
                </nav>
            </div>
        )
    }
}

export default MainHeader
