import React from 'react'; 


/** 게임 시작 버튼 컴포넌트 */
export const Button = (props) => {
  const { isRunning, onStart, onReset } = props; 

  return (
    isRunning
    ? <button onClick={onReset}>게임 재시작</button>
    : <button onClick={onStart}>게임 시작</button>
  )
}
