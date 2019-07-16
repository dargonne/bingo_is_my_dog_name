/**  BINGO Reducer Action Types */
const ACTION_START_FLAG = 'ACTION_START_FLAG'; 
const ACTION_RESTART_FLAG = 'ACTION_RESTART_FLAG'; 
const ACTION_CHANGE_TURN = 'ACTION_CHANGE_TURN'; 
const ACTION_SELECTED_NUMBER = 'ACTION_SELECTED_NUMBER' 

/** BINGO Action Creators */
export const actionStartFlag = () => { return { type: ACTION_START_FLAG }}; 
export const actionRestartFlag = (flag) => { return { type: ACTION_RESTART_FLAG, flag }}; 
export const actionChangeTurn = (player) => { return { type: ACTION_CHANGE_TURN, player}}; 
export const actionSelectedNumber = (value) => { return { type: ACTION_SELECTED_NUMBER, value }}; 

/** Bingo Store 초기 상태 */
const initState = {
  isRunning: false, 
  isRestart: false, 
  nowTurnPlayer: 1, 
  numberSelected: null, 
  playerPoint : {
    "1" : 0, 
    "2" : 0, 
  }
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
    case ACTION_CHANGE_TURN: 
      return {
        ...state, 
        nowTurnPlayer: action.player, 
      }
    case ACTION_SELECTED_NUMBER: 
      return {
        ...state, 
        numberSelected: action.value, 
      }
    default: 
      return state; 
  }
}