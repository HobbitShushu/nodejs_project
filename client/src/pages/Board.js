import React, { Component } from 'react';

import MainHeader from '../components/main/MainHeader'
import BoardContent from '../components/board/BoardContent'
import MainFooter from '../components/main/MainFooter'

import styles from '../css/main.module.css'

class Board extends Component {   
    // triger to change state
  constructor(props) {
      super(props)
      this.state = {
        url_name: '',
        name: ''
      }
  }

  componentWillMount(){
    if(this.props.location.state != undefined)
      this.setState({name: this.props.location.state.name})
    var path = this.props.location.pathname.split('/') // ', user, name'
    this.setState({url_name: path[2]})
  }

  render() {
    return (
        <div className={styles.mainWrapper}>
            <MainHeader username={this.state}/>
            <BoardContent />
            <MainFooter/>
        </div>
    );
  }
}

export default Board;
