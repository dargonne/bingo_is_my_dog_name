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

/** 선택한 번호와 관련된 열이 빙고되어있는지 여부 확인 */
export const CHECK_IS_BINGO = (matrix) => {

}