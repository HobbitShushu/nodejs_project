import React, { Component } from "react"

import styles from '../../css/main.module.css'

class MainContent extends Component {
    constructor(props) {
        super(props)
        console.log("Main content Contrcuted")
        this.state = { 
            board: [],
            picture: [],
            login: false 
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentWillMount() {
        fetch('')
            .then(res => {
                if (res.status !== 200)
                    this.setState({login: false})
                else 
                    this.setState({login: true})       

                res = res.json()
                .then(docs => {
                    if (this.state.login){
                        this.setState({board: docs.result.board})
                        this.setState({picture: docs.result.picture})
                    }
                })
            })
    }

    handleClick(event) {
        event.preventDefault();
        let url = 'http://localhost:3000/' + event.target.id
        window.open(url, '_blank',)
    }

    render() {
        const login = this.state.login
        if (login) {
            var boardList = this.state.board.map((doc) => {
                return <div key={doc._id}>{doc.title}</div>
            })
            var imageList = this.state.picture.map((doc) => {
                return <img src={'/' + doc.imageURL} id={doc.imageURL} key={doc._id} onClick={this.handleClick}/>
            })
        }
        return (
            <div className={styles.main_content}>
                <label>Board</label>
                {boardList}
                <label>Picture</label>
                {imageList}
            </div>
        )
    }
}

export default MainContent