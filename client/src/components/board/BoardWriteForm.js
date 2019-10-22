import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class BoardWriteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            name: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.persist()
        event.preventDefault();
        /*
        var data = new FormData({
            'title': event.target.title.value,
            'context': event.target.context.value,
            'tag': event.target.tag.value,
            'uploadImage': event.target.uploadImage.value
        })
        */
        var data = new FormData()
        data.append('title', event.target.title.value)
        data.append('context', event.target.context.value)
        data.append('tag', event.target.tag.value)
        data.append('uploadImage', event.target.uploadImage.files[0])
        
        // server : board/user/:name/
        // client : board/user/:name/write
        // /board/name/write
        // username save context 나중에
        const name = window.location.pathname.split('/')[2]
        fetch('/board/' + name,  {
            method: 'POST',
            body: data
        })
        .then(res => {
            if(res.status === 200){
                res = res.json()
                .then(res => {
                    return <Redirect to={'/board/' + name }></Redirect>
                })
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <br/>
                    <input type="text" name="title" placeholder="title"/>
                    <br/>
                    <input type="file" name="uploadImage"></input>
                    <br/>
                    <label>context</label>
                    <br/>
                    <textarea type="text" name="context" placeholder="context"/>
                    <br/>
                    <textarea type="text" name="tag" placeholder="tag"/>

                    <button type="submit" value="Submit">Login</button>
                </form>
            </div>
        )
    }
}

export default BoardWriteForm;



//                {login && (<Redirect to={{pathname:"/user/" + name, state:{name:name}}}/>)}
