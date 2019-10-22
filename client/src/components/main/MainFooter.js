import React, { Component } from "react"
import styles from '../../css/main.module.css'

class MainFooter extends Component {
    constructor(props) {
        super(props)
        console.log("Main Footer Contrcuted")
        this.state = { username : '' }
    }

    render() {
        return (
            <div>
                <ul>
                    <li>footer1</li>
                    <li>footer2</li>
                    <li>footer3</li>
                </ul>
            </div>
        )
    }
}

export default MainFooter