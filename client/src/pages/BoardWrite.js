import React, { Component } from 'react';

import MainHeader from '../components/main/MainHeader'
import BoardWriteForm from '../components/board/BoardWriteForm'
import MainFooter from '../components/main/MainFooter'

import styles from '../css/main.module.css'

class BoardWrite extends Component {   
    // triger to change state
    constructor(props) {
        super(props)
        this.state = {
            url_name: '',
            name: ''
        }
        console.log('board write constructe')
    }

  render() {
    return (
        <div className={styles.mainWrapper}>
            <MainHeader />
            <BoardWriteForm />
            <MainFooter/>
        </div>
    );
  }
}

export default BoardWrite;

/*
  componentWillMount(){
    if(this.props.location.state != undefined)
      this.setState({name: this.props.location.state.name})
    var path = this.props.location.pathname.split('/') // ', user, name'
    this.setState({url_name: path[2]})
  }
  */