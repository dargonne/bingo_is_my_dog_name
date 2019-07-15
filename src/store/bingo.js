/**  BINGO Reducer Action Types */
const ACTION_START_FLAG = 'ACTION_START_FLAG'; 
const ACTION_RESTART_FLAG = 'ACTION_RESTART_FLAG'; 

const CHANGE_GAME_STATUS     = 'CHANGE_GAME_STATUS'; 
const RESTART_GAME_STATUS    = 'RESTART_GAME_STATUS'; 
const CHANGE_SELECTED_NUMBER = 'CHANGE_SELECTED_NUMBER'; 
const CHANGE_PLAYER_TURN     = 'CHANGE_PLAYER_TURN'; 
const CHANGE_PLAYER_POINT    = 'CHANGE_PLAYER_POINT'; 
const RESET_STATUS           = 'RESET_STATUS'; 
const CHANGE_RESTART_STATUS  = 'CHANGE_RESTART_STATUS'; 

/** BINGO Action Creators */
export const actionStartFlag = () => { return { type: ACTION_START_FLAG }}; 
export const actionRestartFlag = (flag) => { return { type: ACTION_RESTART_FLAG, flag }}; 

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
  isRunning: false, 
  isRestart: false, 
}; 

/** Bingo Reducers */
export default function bingo(state = initState, action) {
  switch(action.type) {
    case ACTION_START_FLAG: 
      return {
        ...state, 
        isRunning: !state.isRunning, 
      }
    case ACTION_RESTART_FLAG: 
      return {
        ...state, 
        isRestart: action.flag,  
      }
    default: 
      return state; 
  }
}