/**  BINGO Reducer Action Types */
const CHANGE_GAME_STATUS     = 'CHANGE_GAME_STATUS'; 
const RESTART_GAME_STATUS    = 'RESTART_GAME_STATUS'; 
const CHANGE_SELECTED_NUMBER = 'CHANGE_SELECTED_NUMBER'; 
const CHANGE_PLAYER_TURN     = 'CHANGE_PLAYER_TURN'; 
const CHANGE_PLAYER_POINT    = 'CHANGE_PLAYER_POINT'; 
const RESET_STATUS           = 'RESET_STATUS'; 
const CHANGE_RESTART_STATUS  = 'CHANGE_RESTART_STATUS'; 

/** BINGO Action Creators */
export function changeGameStatus(status) {
  return {
    type: CHANGE_GAME_STATUS, 
    status
  }    
}

export function restartGameStatus() {
  return {
    type: RESTART_GAME_STATUS 
  }
}


export function changeRestartStatus(status) {
  return {
    type: CHANGE_RESTART_STATUS, 
    status 
  }
}

export function changeSelectedNumber(value) {
  return {
    type: CHANGE_SELECTED_NUMBER, 
    value 
  }
} 

export function changePlayerTurn(player) {
  return {
    type: CHANGE_PLAYER_TURN, 
    player 
  }
}

export function changePlayerPoint(info) {
  return {
    type: CHANGE_PLAYER_POINT,
    info 
  }
}

export function resetStatus() {
  return {
    type: RESET_STATUS 
  }
}

/** Bingo Store 초기 상태 */
const initState = {
  isRunning: false, // 게임 진행 여부 
  nowPlayer: 1, // 현재 유저 순서 
  selectedNumber: null, // 최근 Cell 선택 번호 
  point : { // 플레이어 (1/2P)간 빙고 성공 개수 
    "1": null, 
    "2": null, 
  }, 
  isRestart: false, // 게임 재시작 여부 Flag 
}; 

/** Bingo Reducers */
export default function bingo(state = initState, action) {
  switch(action.type) {
    case CHANGE_GAME_STATUS:
      return {
        ...state, 
        nowPlayer: 1, 
        isRunning: action.status,
        isRestart: true,  
      }; 
    case RESTART_GAME_STATUS: 
      return {
        ...state, 
        nowPlayer: 1, 
        selectedNumber: [], 
        point: {
          "1": null, 
          "2": null, 
        }, 
        isRunning: true, 
        isRestart: true, 
      } 
    case CHANGE_RESTART_STATUS: 
       return {
         ...state, 
         isRestart: action.status,   
       }
    case CHANGE_SELECTED_NUMBER: 
      return {
        ...state, 
        selectedNumber: action.value, 
      }; 
    case CHANGE_PLAYER_TURN: 
      return {
        ...state, 
        nowPlayer: action.player
      };
    case CHANGE_PLAYER_POINT: 
      return {
        ...state, 
        point: {
          ...state.point, 
          [action.info.player]: action.info.count 
        }
      }
    case RESET_STATUS: 
      return initState; 
    default: 
      return state; 
  }
}