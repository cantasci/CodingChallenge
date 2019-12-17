/**
 *
 * Collect maximum diamonds
 *
 * @param {array} mat
 */
function collectMax(mat) {
  const MAX = 1000;
  const LEFT = 'left';
  const RIGHT = 'right';
  const UP = 'up';
  const DOWN = 'down';
  let isReachEnd = false;
  let usedDirections = [];

  const ROW_COUNT = mat.length;
  if (ROW_COUNT == 0) {
    return 0;
  }

  const COLUMN_COUNT = mat[0].length;
  if (COLUMN_COUNT == 0) {
    return 0;
  }

  let row = 0;
  let column = 0;
  let diamonds = 0;
  let direction = RIGHT;
  let loopCount = -1;

  /**
   * Get next position
   *
   * @param {*} direction
   * @param {*} row
   * @param {*} column
   * @param {*} max
   */
  const getNextPosition = (direction, row, column, max) => {
    switch (direction) {
      case LEFT:
        column = Math.max(0, column - 1);
        break;
        break;
      case RIGHT:
        column = Math.min(max - 1, column + 1);
        break;
      case UP:
        row = Math.max(0, row - 1);
        break;
      case DOWN:
        row = Math.min(max - 1, row + 1);
        break;
    }

    return { newRow: row, newColumn: column };
  };

  /**
   *
   * Get previous position
   *
   * @param {string} direction
   * @param {number} row
   * @param {string} column
   * @param {number} max
   */
  const getPreviousPosition = (direction, row, column, max) => {
    switch (direction) {
      case LEFT:
        column = Math.min(max - 1, column + 1);
        break;
        break;
      case RIGHT:
        column = Math.max(0, column - 1);
        break;
      case UP:
        row = Math.min(max - 1, row + 1);
        break;
      case DOWN:
        row = Math.max(0, row - 1);
        break;
    }

    return { newRow: row, newColumn: column };
  };

  /**
   *
   * Check the row and the column to reach to starting point
   *
   * @param {number} row
   * @param {number} column
   * @param {string} direction
   */
  const isReachedStartPoint = (row, column, direction) => {
    return [LEFT, UP].indexOf(direction) > -1 && row == 0 && column === 0;
  };

  /**
   *
   * Check the row and the column to reach to end point
   *
   * @param {number} row
   * @param {number} column
   * @param {number} max
   */
  const isReachedEndPoint = (row, column, max) => {
    const right = column == ROW_COUNT - 1 ? -1 : mat[row][column + 1],
      down = row == COLUMN_COUNT - 1 ? -1 : mat[row + 1][column];

    if (down === -1 && right === -1 && usedDirections.length > 1) {
      isReachEnd = true;
    }

    if (isReachEnd) return true;
    isReachEnd = row === max - 1 && column === max - 1;
  };

  /**
   *
   * Get possible new direction
   *
   * @param {array} mat
   * @param {number} row
   * @param {number} column
   */
  const getPossibleNewDirection = (mat, row, column) => {
    const UNDEFINED_VALUE = -2;
    const right =
        column == ROW_COUNT - 1 ? UNDEFINED_VALUE : mat[row][column + 1],
      left = column == 0 ? UNDEFINED_VALUE : mat[row][column - 1],
      up = row == 0 ? UNDEFINED_VALUE : mat[row - 1][column],
      down = row == COLUMN_COUNT - 1 ? UNDEFINED_VALUE : mat[row + 1][column];

    let direction = null;
    let lookingValues = [0, 1];
    isReachedEndPoint(row, column, ROW_COUNT);

    if (!isReachEnd) {
      if (lookingValues.indexOf(right) > -1) {
        direction = RIGHT;
      } else if (lookingValues.indexOf(down) > -1) {
        direction = DOWN;
      }
    } else {
      if (lookingValues.indexOf(left) > -1) {
        direction = LEFT;
      } else if (lookingValues.indexOf(up) > -1) {
        direction = UP;
      }
    }
    return direction;
  };

  while (++loopCount < MAX) {
    // console.log(`row:${row} - column:${column} - isReachEnd:${isReachEnd} - usedDirections: ${usedDirections}`);
    if (isReachedStartPoint(row, column, direction)) {
      break;
    }

    usedDirections = [
      ...usedDirections.filter(v => v !== direction),
      direction,
    ];
    const current = mat[row][column];
    if (current === 1) {
      // collect the diamond
      diamonds += 1;
      mat[row][column] = 0;
      continue;
    } else if (current === 0) {
      // move
      const { newRow, newColumn } = getNextPosition(
        direction,
        row,
        column,
        ROW_COUNT
      );
      if (row == newRow && column == newColumn) {
        const newDirection = getPossibleNewDirection(mat, row, column);
        if (newDirection) {
          direction = newDirection;
        } else {
          diamonds = 0;
          loopCount = MAX + 1;
        }
      } else {
        row = newRow;
        column = newColumn;
      }
    } else if (current === -1) {
      // reached the block and go to different direction
      const { newRow, newColumn } = getPreviousPosition(
        direction,
        row,
        column,
        ROW_COUNT
      );
      row = newRow;
      column = newColumn;

      const newDirection = getPossibleNewDirection(mat, row, column);
      if (newDirection) {
        direction = newDirection;
      } else {
        diamonds = 0;
        loopCount = MAX + 1;
      }
    }
  }
 
  return diamonds;
}

// test cases
console.log(collectMax([[0, 1, -1], [1, 0, -1], [1, 1, 1]]) === 5);
console.log(collectMax([[0, 1, -1], [1, 0, -1], [-1, -1, -1]]) === 2);
console.log(collectMax([[-1, 1, -1], [-1, 0, -1], [-1, -1, -1]]) === 0);
console.log(collectMax([[0, 1, 1], [1, 0, -1], [1, 1, -1]]) === 0);
