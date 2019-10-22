import React, { Component } from "react"
import { Link, Redirect} from 'react-router-dom'
import styles from '../../css/board.module.css'

class BoardContent extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            picture: {},
            login: false,
            detailUrl: '',
        }
        this.handleClickPost = this.handleClickPost.bind(this);
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
                        this.setState({picture: docs.result})
                    }
                })
            })
    }

    handleClickPost(event) {
        event.preventDefault();        
    }

    render() {
        const login = this.state.login
        
        if (login && this.state.picture.length) {
            var boardList = this.state.picture.map((doc) => {
                return (
                    <div key={doc._id} id={doc._id}>
                        Title : {doc.title}<br/>
                        <img src={'/' + doc.imageURL} width='300' heigth='300'/>
                        {doc.context}<br/>
                        {doc.date}<br/>
                    </div>)
            })
        }
        return (
            <div className={styles.boardDetail_wrapper}>
                <label>Picture</label>
                {boardList}
            </div>
        )
    }
}

export default BoardContent