import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

import { Title } from '../components/Title'; 
import { Button } from '../components/StartButton'; 
import Board from '../containers/Board'; 

import './root.css'; 
import { changeGameStatus, restartGameStatus, resetStatus } from '../store/bingo'; 

/** 페이지 최상위 (Root) 컴포넌트 */
class Root extends Component {
  constructor(props) {
    super(props); 
  }

  
  componentDidUpdate(prevPros, prevState) {
    const nextProps = this.props; 
    this.alertWinner(nextProps.point); 
  }

  /** 
   * 각 플레이어(1 / 2P)의 빙고 성공 점수를 획득하여 비교 후 
   * 조건에 알맞는 알림 메세지 보이기 
   */
  async alertWinner(point) {
    const player1P = point["1"]; 
    const player2P = point["2"]; 

    if(player1P > 4 || player2P > 4) {
      if(player1P >=5 && player2P < 5) {
        alert('1P가 빙고를 완성했습니다!'); 
      } else if(player2P >=5 && player2P < 5) {
        alert('2P가 빙고를 완성했습니다!'); 
      }

      await this.clearBoard(); 
    } else if ((player1P > 4) && (player2P > 4)) {
      alert('무승부 입니다'); 
      await this.clearBoard(); 
    }

  }

  /** 게임 내 Store 및 보드 내용 초기화 */
  clearBoard() {
    const { onTerminate } = this.props; 
    onTerminate(); 
  }
  
  /** Rendering */
  render() {
    const { isRunning, onStart, onReset } = this.props; 

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
          <Button 
            isRunning={isRunning} 
            onStart={onStart} 
            onReset={onReset}   
          /> 
        </div>
      </div>
    )
  }
}


const rootStateToProps = ({bingo}) => {
  return {
    isRunning: bingo.isRunning, 
    point: bingo.point,  
  }
}

const rootDispatchToProps = (dispatch) => {
  return {
    onStart: () => { dispatch(changeGameStatus(true))}, 
    onReset: () => { dispatch(restartGameStatus()) }, 
    onTerminate: () => { dispatch(resetStatus()) }
  }
}

export default connect(rootStateToProps, rootDispatchToProps)(Root); 