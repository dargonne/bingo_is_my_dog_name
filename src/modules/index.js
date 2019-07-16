/** 빙고 숫자판 초기화 **/
export const INIT_BINGO_MATRIX = () => {
    let arrInitMatrix = []; 

    for(let row=0; row<5; row++) {
      let arrInitRow = []; 

      for(let col=0; col<5; col++) {
        const tmpItem = {
          value: "", 
          checked: false, 
          finished: null, 
        }; 

        arrInitRow.push(tmpItem); 
      }

      arrInitMatrix.push(arrInitRow); 
    }

    return arrInitMatrix; 
}

/** 셔플된 빙고 숫자판 반환 */
export const SUFFLE_BINGO_MATRIX = async (matrix) => {
    const SIZE = 25; 
    let arrNumbers = []; 
    
    for(let number=1; number<=SIZE; number++) {
      arrNumbers.push(number); 
    }

    return await matrix.map((row) => {
                    row.map((col) => {
                      col.value = arrNumbers.splice(Math.floor(Math.random() * arrNumbers.length), 1)[0]; 
                      return col; 
                    }); 

                    return row; 
                  });  
}

/** 선택한 번호에 대한 체크 처리 */
export const CHECK_NUMBER_ON_BOARD = async (matrix, selected) => {
  return await matrix.map((row) => {
    row.map((col) => {
      if(col.value === selected) {
        col.checked = true; 
        return col; 
      }
      
    }); 

    return row; 
  });  
}

/** 빙고 완성시 카운팅 표시  */
export const CHECK_FINISH_BINGO_COUNT = async(matrix, selected, count) => {
  return await matrix.map((row) => {
    row.map((col) => {

      if(col.value === selected) {
        col.finished = count; 
        return col; 
      }
      
    }); 

    return row; 
  });   
}

/** 빙고 개수 카운팅 */
export const CHECK_IS_BINGO = (matrix) => {

  const horizontalCount = CHECK_HORIZONTAL_BINGO(matrix); 
  const verticalCount = CHECK_VERTICAL_BINGO(matrix); 
  const diagnalCount = CHECK_DIAGNAL_BINGO(matrix); 

  return horizontalCount + verticalCount + diagnalCount; 
}


/** 가로 빙고 개수 확인 */
const CHECK_HORIZONTAL_BINGO = (matrix) => {
  let horizontalBingoCount = 0; 

  for(let row=0; row<matrix.length; row++) {
    const rowResult = matrix[row].every(col => col.checked === true); 

    if(rowResult) {
      ++horizontalBingoCount; 
    }
  }

  return horizontalBingoCount; 
}

/** 세로 빙고 개수 확인 */
const CHECK_VERTICAL_BINGO = (matrix) => {
  let verticalBingoCount = 0; 

  for(let col=0; col<matrix.length; col++) {

    let isBingo = true; 

    for(let row=0; row<matrix.length; row++) {
      if(!matrix[row][col].checked){
        isBingo = false; 
      }
    }

    if(isBingo) {
      ++verticalBingoCount; 
    }
  }

  return verticalBingoCount; 
}

/** 대각선 빙고 개수 확인 */
const CHECK_DIAGNAL_BINGO = (matrix) => {
  const SIZE = 4; 
  let diagnalLeftToRight = 1; 
  let diagnalRightToLeft = 1; 
  
  for(let idx=0; idx<matrix.length; idx++) {
    if(!matrix[idx][idx].checked) {
      diagnalLeftToRight = 0; 
    }

    if(!matrix[idx][SIZE-idx].checked) {
      diagnalRightToLeft = 0; 
    }
  }

  return diagnalLeftToRight + diagnalRightToLeft; 
}