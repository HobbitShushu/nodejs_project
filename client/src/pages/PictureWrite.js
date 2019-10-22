import React, { Component } from 'react';

import MainHeader from '../components/main/MainHeader'
import PictureWriteForm from '../components/picture/PictureWriteForm'
import MainFooter from '../components/main/MainFooter'

import styles from '../css/main.module.css'

class PictureWrite extends Component {   
    // triger to change state
    constructor(props) {
        super(props)
        this.state = {
            url_name: '',
            name: ''
        }
        console.log('picture write constructe')
    }

  render() {
    return (
        <div className={styles.mainWrapper}>
            <MainHeader />
            <PictureWriteForm />
            <MainFooter/>
        </div>
    );
  }
}

export default PictureWrite;