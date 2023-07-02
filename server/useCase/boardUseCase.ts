import type { UserId } from '$/commonTypesWithClient/branded';
import { colorUseCase } from './colorUseCase';

const board: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 1, 2, 3, 0, 0],
  [0, 0, 3, 2, 1, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
const di = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];
//x=>ユーザーがクリックしたｘ座標
//y=>ユーザーがクリックしたｙ座標
//by=>横への移動方向
//ve=>縦への移動方向
const next = (x: number, y: number, by: number, ve: number, userId: UserId) => {
  if (0 < x + by && x + by < 8 && 0 < y + ve && y + ve < 8) {
    if (board[y + ve][x + by] === 3 - colorUseCase.createColor(userId)) {
      next(x + by, y + ve, by, ve, userId);
    } else if (board[y + ve][x + by] === colorUseCase.createColor(userId)) {
      return [y + ve, x + by];
      //自分の石と対になる
    }
  }
  return [9];
};

const turnColor = (x: number, y: number, di: number[], goal: number[], userId: UserId) => {
  if (goal[0] !== 9) {
    for (let i = goal[1] - di[1]; i !== x; i -= di[1]) {
      for (let j = goal[0] - di[0]; j !== y; j -= di[0]) {
        board[j][i] = colorUseCase.createColor(userId);
      }
    }
  }
};
export const boardUseCase = {
  turnColor: () => 1,
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId) => {
    console.log(111, x, y);
    //ここに挟まれた石を反転させる処理させればいいんじゃない？
    for (let i = 0; i < 8; i++) {
      if (0 < x + di[i][1] && x + di[i][1] < 8 && 0 < y + di[i][0] && y + di[i][0] < 8) {
        if (board[y + di[i][0]][x + di[i][1]] === 3 - colorUseCase.createColor(userId)) {
          turnColor(
            x,
            y,
            di[i],
            next(x + di[i][1], y + di[i][0], di[i][1], di[i][0], userId),
            userId
          );
          board[y][x] = colorUseCase.createColor(userId);
        }
      }
    }

    return board;
  },
};
