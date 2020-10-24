import { Snake } from '../../../common/types/snake';
import { Direction } from '../../../common/types/direction';

const left = (x: number, y: number, snake: Snake) =>
  snake.map((col, i) => {
    if (i === x) {
      return col.map((row, j) => {
        if (j === (col.length - 1) && y === 0) {
          return {
            position: 0
          };
        }
        if (y === j) {
          return {
            position: -1
          };
        }
        if ((y - 1) === j) {
          return {
            position: 0
          };
        }
        return row;
      });
    }
    return col;
  });

const right = (x: number, y: number, snake: Snake) =>
  snake.map((col, i) => {
    if (i === x) {
      return col.map((row, j) => {
        if (j === 0 && y === (col.length - 1)) {
          return {
            position: 0
          };
        }
        if (y === j) {
          return {
            position: -1
          };
        }
        if ((y + 1) === j) {
          return {
            position: 0
          };
        }
        return row;
      });
    }
    return col;
  });

const bottom = (x: number, y: number, snake: Snake) =>
  snake.map((col, i) => {
    if (i === 0 && x === (snake.length - 1)) {
      return col.map((row, j) => {
        if (j === 0 && y === (col.length - 1)) {
          return {
            position: 0
          };
        }
        if (j === y) {
          return {
            position: 0
          };
        }
        return row;
      });
    }

    if (x === i) {
      return col.map((row, j) => {
        if (y === j) {
          return {
            position: -1
          };
        }
        return row;
      });
    }

    if ((x + 1) === i) {
      return col.map((row, j) => {
        if (y === j) {
          return {
            position: 0
          };
        }
        return row;
      });
    }

    return col;
  });

const top = (x: number, y: number, snake: Snake) =>
  snake.map((col, i) => {
    if (i === (snake.length - 1) && x === 0) {
      return col.map((row, j) => {
        if (j === (col.length - 1) && y === 0) {
          return {
            position: 0
          };
        }
        if (j === y) {
          return {
            position: 0
          };
        }
        return row;
      });
    }

    if (x === i) {
      return col.map((row, j) => {
        if (y === j) {
          return {
            position: -1
          };
        }
        return row;
      });
    }

    if ((x - 1) === i) {
      return col.map((row, j) => {
        if (y === j) {
          return {
            position: 0
          };
        }
        return row;
      });
    }

    return col;
  });

export const positions = (matrix: Snake) => matrix.reduce((acc, value, i) => {
  const head = value.findIndex((row) => row.position === 0);

  if (head > -1) {
    return [i, head];
  }
  return acc;
}, [-1, -1]);

export const move = (direction: Direction, x: number, y: number, snake: Snake) => {
  switch (direction) {
    case 'right':
      return right(x, y, snake);
    case 'left':
      return left(x, y, snake);
    case 'top':
      return top(x, y, snake);
    case 'bottom':
      return bottom(x, y, snake);
    default:
      return snake;
  };
};