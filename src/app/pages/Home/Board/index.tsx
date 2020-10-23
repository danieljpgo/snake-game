import React, { useState } from 'react';
import MatrixContainer from '../../../common/components/Matrix';
import { useInterval } from '../../../common/hooks/use-interval';
import { Key } from '../../../common/types/direction';
import { Snake } from '../../../common/types/snake';
import { Matrix } from '../../../common/types/matrix';
import { move } from './utils';

const ticker = 310;
const size = 10;
const matrix: Matrix = Array
  .from({ length: size }, (_, k) => Array
    .from({ length: size }, (_, x) => ({
      status: 'unfill'
    })));

const snakeInit: Snake = Array
  .from({ length: size }, (_, k) => Array
    .from({ length: size }, (_, x) => {
      return {
        position: (x === size / 2 && k === size / 2) ? 0 : -1
      }
    }));


interface Props {
  arrow: Key
}

//@TODO improve the use of typing and enums

const Board = (props: Props) => {
  const { arrow } = props;
  const [snake, setSnake] = useState<Snake>(snakeInit);
  const [run, setRun] = useState(true);

  useInterval(() => {
    setSnake((prev) => {
      const [x, y] = prev.reduce((acc, value, i) => {
        const head = value.findIndex((row) => row.position === 0);
        if (head > -1) {
          return [i, head];
        }
        return acc;
      }, [-1, -1]);

      return move(arrow, x, y, snake);
    })
  }, (run ? ticker : null));

  return (
    <div>
      <button onClick={() => setRun((prev) => !prev)} >
        {run ? 'stop' : 'play'}
      </button>
      <MatrixContainer
        size={size}
        matrix={matrix}
        snake={snake}
      />
    </div>
  );
}

export default Board;