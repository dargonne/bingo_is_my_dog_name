import React, { Component }  from 'react'; 
import { connect } from 'react-redux'; 
import { changeRestartStatus, changeGameStatus, changeSelectedNumber, changePlayerTurn, changePlayerPoint } from '../store/bingo'; 

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
  constructor(props) {
    super(props); 
    
    this.state = {
      player: props.player, 
      matrix: null, 
    }; 
    
  }

  /** 최초 렌더링시 빈 보드판 생성 */
  componentDidMount() {
    const { matrix } = this.state; 
  
    if(!matrix) {
      this.initMatrix(); 
    } 
  }
  
  /** 게임 시작, 숫자 Cell 선택시 */
  componentDidUpdate(prevProps, prevState) {
    const nextProps = this.props;  

    if(nextProps.isRunning && nextProps.isRestart) {
      this.suffle(); 
    }

    if(nextProps.selectedNumber) {
      this.evtNumberSelected(nextProps.selectedNumber); 
    }
 
  }

  /** Board 내 Cell 클릭 이벤트 발생 시 숫자 체크 표시 렌더링 처리 */
  async evtNumberSelected(value) {
    const { matrix } = this.state; 
    const { changeSelectedNumber } = this.props; 
 
    const findOutMatrix =  await matrix.map((row) => 
                              row.map((col) => {
                                if(col.value[0] === value) {
                                  col.checked = true; 
                                }
                                return col; 
                              })
                           ); 
    
    await changeSelectedNumber(null);  
    
    await this.setState({
      player: this.props.player, 
      matrix: findOutMatrix, 
    }); 

    await this.checkIsBingo(); 
  }

  /** 해당 플레이어의 빙고 개수 여부 확인 */
  checkIsBingo() {

    const { matrix } = this.state; 
    const { player } = this.props; 

    let bingoCount = 0; 
    
    // 가로 빙고 개수 획득 
    for(let row=0; row < matrix.length; row++ ) {
      
      let isBingo = true; 

      for(let col=0; col < matrix[row].length; col++) {
        const item = matrix[row][col]; 
        
        if(!item.checked) {
          isBingo = false; 
        }
      }

      if(isBingo) {
        
        bingoCount++; 
        const setPosition = {
          row, 
          col: 0
        }
        this.labelingBingo(setPosition, bingoCount, player); 
      }
    }

    // 세로 빙고 개수 획득 
    for(let col=0; col < matrix.length; col++) {
      let isBingo = true; 

      for(let row=0; row < matrix[col].length; row++) {
        const item = matrix[row][col]; 

        if(!item.checked) {
          isBingo = false; 
        }
      }

      if(isBingo) {
        bingoCount++; 
        const setPosition = {
          col, 
          row: 0
        }
        this.labelingBingo(setPosition, bingoCount, player); 
      }
    }
    
    // 대각선 빙고 여부
    let bingoLtoR = true; 
    let bingoRtoL = true; 
    const SIZE = matrix.length; 

    for(let cnt=0; cnt < SIZE; cnt++) {
      const item = matrix[cnt][cnt]; 

      if(!item.checked) {
        bingoLtoR = false; 
      }
    }

    if(bingoLtoR) {
      bingoCount++;
      const setPosition = {
        row: 1, 
        col: 1, 
      }
      this.labelingBingo(setPosition, bingoCount, player);  
    }

    for(let cnt=0; cnt < SIZE; cnt++) {
      const item = matrix[cnt][(SIZE-1)-cnt]; 

      if(!item.checked) {
        bingoRtoL = false; 
      }
    }

    if(bingoRtoL) {
      bingoCount++;
      const setPosition = {
        row: 3, 
        col: 3,
      }

      this.labelingBingo(setPosition, bingoCount, player); 
    } 
    
    const playerPointInfo = {
      player: this.props.player, 
      count: bingoCount
    }; 

    const { changePlayerPoint } = this.props; 

    changePlayerPoint(playerPointInfo); 
  }

  /** 
   * 한줄 빙고시 빙고 생성 순서 라벨을 출력 처리하는 함수 
   * issue 발생으로 처리방법 고안중 
   */
  labelingBingo(position, count, player) {
    
  }

  /** 최초 보드 2차원 배열 생성(초기화) */
  initMatrix() {
    let arrInitMatrix = []; 

    for(let row=0; row<5; row++) {
      let arrInitRow = []; 

      for(let col=0; col<5; col++) {
        const tmpItem = {
          value: "", 
          checked: false, 
          finished: [], 
        }; 

        arrInitRow.push(tmpItem); 
      }

      arrInitMatrix.push(arrInitRow); 
    }

    this.setState({
      matrix: arrInitMatrix, 
    }); 

  }

  /** 게임 시작 또는 재시작 시 임의의 숫자로 생성하여 보드에 표기 */
  suffle() {
    const SIZE = 25; 
    let arrNumbers = []; 
    let arrMatrix = []; 
    
    for(let number=1; number<=SIZE; number++) {
      arrNumbers.push(number); 
    }

    for(let row=0; row<5; row++) {
      let arrColumn = []; 
      
      for(let col=0; col<5; col++) {
        const objCell = {
          value: arrNumbers.splice(Math.floor(Math.random() * arrNumbers.length) ,1), 
          checked: false, 
          finished: [],
        }; 

        arrColumn.push(objCell); 
      }

      arrMatrix.push(arrColumn); 
    }

    this.setState({
      matrix: arrMatrix, 
    }); 

    this.props.changeRestartStatus(false); 
  }

  /** 렌더링 */
  render() {
    const { player, isRunning, nowPlayer } = this.props; 
    const { matrix } = this.state; 

    return (
      <div className="board-container">
        <div className="player">
          Player&nbsp;{ player }
        </div>
        <div className="board">
          {
            matrix ? matrix.map((row, rowIdx) => 
              row.map((col, colIdx) => (
                <Cell 
                  key={(rowIdx + colIdx) + 1}
                  player={Number(player)}
                  nowPlayer={nowPlayer}
                  rowIdx={rowIdx}
                  colIdx={colIdx} 
                  value={col.value}
                  checked={col.checked}
                  finished={col.finished}
                  isRunning={isRunning}
                />  
              ))
            ) : ""
          }
        </div>
      </div> 
    )
  }
}

const boardStateToProps = ({ bingo }) => {
  return bingo; 
}; 

const boardDispatchToProps = dispatch => ({
  changeGameStatus: status => dispatch(changeGameStatus(status)), 
  changeRestartStatus: status => dispatch(changeRestartStatus(status)), 
  changeSelectedNumber: number => dispatch(changeSelectedNumber(number)), 
  changePlayerTurn: player => dispatch(changePlayerTurn(player)), 
  changePlayerPoint: info => dispatch(changePlayerPoint(info)), 
}); 


export default connect(boardStateToProps, boardDispatchToProps)(Board); 