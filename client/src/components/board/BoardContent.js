import React, { Component } from "react"
import { Link, Redirect} from 'react-router-dom'
import styles from '../../css/main.module.css'

class BoardContent extends Component {
    constructor(props) {
        super(props)
        console.log("Board main content Contrcuted")
        this.state = { 
            board: [],
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
        event.persist() // warning : recommend to use event.persist()
        event.preventDefault();
        var id = event.target.id
        this.setState({detailUrl: window.location.pathname + '/' + id})
    }

    render() {
        const login = this.state.login
        const { detailUrl } = this.state
        const pathname = window.location.pathname
        if (login && this.state.board.length) {
            var boardList = this.state.board.map((doc) => {
                return <div key={doc._id} id={doc._id} onClick={this.handleClickPost}>{doc.title}</div>
            })
        }
        return (
            <div className={styles.main_content}>
                {detailUrl.length > 0 && (<Redirect to={detailUrl}/>)}
                <label>Board</label>
                {boardList}

                <br/><br/>
                <label>welcome</label>
                <Link to={pathname + '/write' }>write</Link>
            </div>
        )
    }
}

export default BoardContent


/*
                {detailUrl.length > 0 && (<Redirect to={detailUrl}/>)}
*/