import React, { Component } from "react"
import { Link, Redirect} from 'react-router-dom'
import styles from '../../css/board.module.css'

class BoardContent extends Component {
    constructor(props) {
        super(props)
        console.log("Board content Contrcuted")
        this.state = { 
            board: {},
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
                        this.setState({board: docs.result})
                    }
                })
            })
    }

    handleClickPost(event) {
        event.preventDefault();        
    }

    render() {
        const login = this.state.login
        console.log(this.state.board)
        
        if (login && this.state.board.length) {

            var boardList = this.state.board.map((doc) => {
                return (
                    <div key={doc._id} id={doc._id}>
                        Title : {doc.title}<br/>
                        {doc.context}<br/>
                        {doc.date}<br/>
                    </div>)
            })
        }
        return (
            <div className={styles.boardDetail_wrapper}>
                <label>Board</label>
                {boardList}
            </div>
        )
    }
}

export default BoardContent


/*
                {detailUrl.length > 0 && (<Redirect to={detailUrl}/>)}
*/