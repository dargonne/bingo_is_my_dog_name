import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { changeSelectedNumber, changePlayerTurn } from '../store/bingo'; 
import './boardcell.css'; 

/** 보드 내 셀 컴포넌트 */
class Cell extends Component {
  constructor(props) {
    super(props); 

    this.handleCheckEvt = this.handleCheckEvt.bind(this); 
  }

  /** 숫자 셀 클릭시 이벤트 예외처리 */
  handleCheckEvt() {
    const { player, nowPlayer, value, checked, changeSelectedNumber, changePlayerTurn } = this.props; 
    
    /** 게임 시작 전(초기화) 상태일 때  */
    if(!value) {
      return; 
    } 

    /** 자신의 차례가 아닐 경우 */
    if(player !== nowPlayer) {
      return alert('잘못된 차레입니다. 😭'); 
    }

    /** 해당 번호가 이미 선택되었을 경우  */
    if(checked) {
      return alert('이미 이 번호를 선택했어요! 😰')
    }

    /** 예외처리에 해당하지 않았다면 선택한 번호와 다음 턴을 이용할 플레이어 정보를 Store에 저장 */
    const passTurnPlayer = player !== 1 ? 1 : 2;  
    changeSelectedNumber(value[0]); 
    changePlayerTurn(passTurnPlayer); 
  }

  /** 렌더링 */
  render() {
    const { value, checked, finished } = this.props; 

    // 해당 셀에 빙고 완성 순번 저장 
    let finishList; 

    if(finished) {
      finishList = finished.map((item) => <div className="finished">{ finished} </div>)
    }

    return (
      <div className="board-cell" onClick={this.handleCheckEvt}>
        { checked ? <div className="checked">{ value }</div> : <div>{ value }</div> }
        { finished ? finishList : "" }
      </div> 
    )
  }
}

const cellStateToProps = ({bingo}) => {
  return {
    point : bingo.point, 
  }
}

const cellDispatchToProps = dispatch => ({
  changeSelectedNumber: value => dispatch(changeSelectedNumber(value)),
  changePlayerTurn: player => dispatch(changePlayerTurn(player))
}); 

export default connect(cellStateToProps, cellDispatchToProps)(Cell); 