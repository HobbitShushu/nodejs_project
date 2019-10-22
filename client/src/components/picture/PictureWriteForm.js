import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PictureWriteForm extends Component {
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
    
        var data = new FormData()
        data.append('type', 'picture')
        data.append('title', event.target.title.value)
        data.append('context', event.target.context.value)
        data.append('tag', event.target.tag.value)
        data.append('uploadImage', event.target.uploadImage.files[0])
        
        const name = window.location.pathname.split('/')[2]
        fetch('/picture/' + name,  {
            method: 'POST',
            body: data
        })
        .then(res => {
            if(res.status === 200){
                res = res.json()
                .then(res => {
                    return <Redirect to={'/picture/' + name }></Redirect>
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

export default PictureWriteForm;