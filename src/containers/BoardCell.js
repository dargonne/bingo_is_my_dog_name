import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { actionChangeTurn, actionSelectedNumber } from '../store/bingo'; 
import './boardcell.css'; 

/** 보드 내 셀 컴포넌트 */
class Cell extends Component {
  constructor(props) {
    super(props); 

    this.handleCheckEvt = this.handleCheckEvt.bind(this); 
  }

  /** 숫자 셀 클릭시 이벤트 예외처리 */
  handleCheckEvt() {
    const { player, nowTurnPlayer, value, checked } = this.props; 
    
    /** 게임 시작 전(초기화) 상태일 때  */
    if(!value) {
      return; 
    } 

    /** 자신의 차례가 아닐 경우 */
    if(player !== nowTurnPlayer) {
      return alert('잘못된 차레입니다. 😭'); 
    }

    /** 해당 번호가 이미 선택되었을 경우  */
    if(checked) {
      return alert('이미 이 번호를 선택했어요! 😰')
    }

    /** 모든 조건이 되었을 경우 셀 정보를 store에 전달 */
    this.dispatchSelectedNumber(); 
  }

  async dispatchSelectedNumber() {
    const { player, value, changeTurn, numSelected } = this.props;

    await numSelected(value); 

    const nextPlayer = player === 1 ? 2 : 1; 
    await changeTurn(nextPlayer); 
  }

  /** 렌더링 */
  render() {
    const { checked, value } = this.props; 
    // const { value, checked, finished } = this.props; 

    // 해당 셀에 빙고 완성 순번 저장 
    // let finishList; 

    // if(finished) {
    //   finishList = finished.map((item) => <div className="finished">{ finished} </div>)
    // }

    return (
      <div className="board-cell" onClick={this.handleCheckEvt}>
        { checked ? <div className="checked">{ value }</div> : <div>{ value }</div> }
      </div> 
    )
  }
}

const cellStateToProps = ({bingo}) => {
  return bingo; 
}

const cellDispatchToProps = (dispatch) => {
  return {
    changeTurn: (player) => { dispatch(actionChangeTurn(player))}, 
    numSelected: (value) => { dispatch(actionSelectedNumber(value))}, 
  } 
}; 

export default connect(cellStateToProps, cellDispatchToProps)(Cell); 