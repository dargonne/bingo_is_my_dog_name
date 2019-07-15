import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

import { Title } from '../components/Title'; 
import Board from '../containers/Board'; 

import './root.css'; 
import { actionStartFlag, actionRestartFlag } from '../store/bingo'; 

/** 페이지 최상위 (Root) 컴포넌트 */
class Root extends Component {

  constructor(props) {
    super(props); 

    this.handleOnStart = this.handleOnStart.bind(this); 
    this.handleOnRestart = this.handleOnRestart.bind(this); 
  }

  handleOnStart = (e) => {
    e.preventDefault();
    console.log('start'); 
    const { onStart } = this.props; 
    onStart(); 
  }

  handleOnRestart = (e) => {
    e.preventDefault();
    console.log('restart'); 
    const { onRestart }  = this.props; 
    onRestart(true); 
  }

  
  /** Rendering */
  render() {
    const { isRunning } = this.props; 

    return (
      <div className="root-wrapper"> 
        <div className="title">
          <Title /> 
        </div>
        <div className="board">
          <Board player="1"/>
          <Board player="2"/>
        </div>
        <div className="button">
          { !isRunning ? <button onClick={this.handleOnStart}>시작하기</button> : "" }
          { isRunning ? <button onClick={this.handleOnRestart}>재시작하기</button> : "" } 
        </div>
      </div>
    )
  }
}


const rootStateToProps = ({bingo}) => {
  return {
    isRunning: bingo.isRunning, 
  }
}

const rootDispatchToProps = (dispatch) => {
  return {
    onStart: () => { dispatch(actionStartFlag())}, 
    onRestart: (flag) => { dispatch(actionRestartFlag(flag))}, 
  }
}

export default connect(rootStateToProps, rootDispatchToProps)(Root); 