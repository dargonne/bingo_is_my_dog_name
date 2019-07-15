import React, { Component }  from 'react'; 
import { connect } from 'react-redux'; 
import { actionRestartFlag } from '../store/bingo'; 
import { INIT_BINGO_MATRIX, SUFFLE_BINGO_MATRIX, CHECK_IS_BINGO } from '../modules'; 

import Cell from './BoardCell'; 

import './board.css'; 

/** 각 플레이어 별 보드 컨테이너 */
class Board extends Component {

  /** 
   * 보드 내용은 각 컴포넌트 Status(matrix)에 2차원 배열로 저장되어 있으며 
   * 자신의 차례가 되어 번호를 선택할 때 State가 변경되어 리렌더링 되는 구조 
   * 
   * 코드 작성 당시 모든 사항을 store에 저장할 필요가 없다고 판단했기 때문에(추후 유지보수 및 관리에 대한 우려) 
   * 컴포넌트 간 공유에 필요한 사항을 store에 저장하고 나머지는 컴포넌트 내에서 
   * 데이터 활용하기로 결정하고 코드를 작성하게 되었습니다. 
   */
  flagRestart = false; 
  
  constructor(props) {
    super(props); 
    
    this.state = {
      matrix: null 
    }; 
    
  }

  /** 최초 렌더링시 빈 보드판 생성 */
  componentDidMount() {
    const { matrix } = this.state; 
  
    if(!matrix) {
      this.init(); 
    } 
  }

  componentDidUpdate(prevProps, prevStatus) {
    const nextProps = this.props;

    if(!prevProps.isRunning && nextProps.isRunning) {
      this.suffle(); 
    }

    if(nextProps.isRunning && nextProps.isRestart) {
      this.suffle();
    } 
  }

  async init() {
    this.setState({
      matrix: await INIT_BINGO_MATRIX()
    }); 
  }

  async suffle() {
    const { matrix } = this.state; 
    const { isRestart, onRestart } = this.props; 

    if(matrix) {
      this.setState({
        matrix: await SUFFLE_BINGO_MATRIX(matrix)  
      });

      if(isRestart) {
        onRestart(false); 
      }
    }
  }

  /** 렌더링 */
  render() {
    const { player } = this.props; 
    const { matrix } = this.state; 

    let renderComp = null; 

    if(matrix) {

      renderComp = matrix.map((row, rowIdx) => (
                      row.map((col, colIdx) => (
                        <Cell 
                          key={(colIdx + rowIdx) + 1}
                          value={col.value} 
                          /> 
                      ))
                    )); 
    }


    return (
      <div className="board-container">
        <div className="player">
          Player&nbsp;{ player }
        </div>
        <div className="board">
          {
            renderComp ? renderComp : "" 
          }
        </div>
      </div> 
    )
  }
}

const boardStateToProps = ({ bingo }) => {
  return bingo; 
}; 

const boardDispatchToProps = (dispatch) => {
  return {
    onRestart: (flag) => { dispatch(actionRestartFlag(flag))}, 
  }
}; 


export default connect(boardStateToProps, boardDispatchToProps)(Board); 