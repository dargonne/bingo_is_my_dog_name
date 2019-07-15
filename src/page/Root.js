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
  }

  
  /** Rendering */
  render() {
    const { isRunning, isRestart, onStart, onReset } = this.props; 
    
    let renderButton = null; 

    if(!renderButton) {
      if(!isRunning) {
        renderButton = <button onClick={onStart}>시작하기</button>
      } else {
        renderButton = <button onClick={onReset}>재시작하기</button>
      }
    }

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
          { renderButton ? renderButton : "" }
        </div>
      </div>
    )
  }
}


const rootStateToProps = ({bingo}) => {
  return {
    isRunning: bingo.isRunning, 
    isRestart: bingo.isRestart,   
  }
}

const rootDispatchToProps = (dispatch) => {
  return {
    onStart: () => { dispatch(actionStartFlag())}, 
    onReset: () => { dispatch(actionRestartFlag())}, 
  }
}

export default connect(rootStateToProps, rootDispatchToProps)(Root); 