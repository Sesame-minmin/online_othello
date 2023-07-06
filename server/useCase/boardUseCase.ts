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
const directions: number[][] = [
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
//by=>横への移動方向、ｘにくっつく
//ve=>縦への移動方向、ｙにくっつく
//if (board[y + ve][x + by] === 3 - colorUseCase.createColor(userId)) {
//count += 1;
//next(x + by, y + ve, by, ve, userId, count);
//} else if (board[y + ve][x + by] === colorUseCase.createColor(userId)) {
//return [y, x, count];
//自分の石と対になる
//}

//while (board[y + count * ve][x + count * by] === 3 - colorUseCase.createColor(userId)) {
// count += 1;
//if (board[y + count * ve][x + count * by] === colorUseCase.createColor(userId)) {
//return [y + count * ve, x + count * by, count];
//}
//}
const next = (x: number, y: number, by: number, ve: number, userId: UserId, count: number) => {
  if (0 < x + by && x + by < 8 && 0 < y + ve && y + ve < 8) {
    if (board[y + ve][x + by] === 3 - colorUseCase.createColor(userId)) {
      count += 1;
      next(x + by, y + ve, by, ve, userId, count);
    } else if (board[y + ve][x + by] === colorUseCase.createColor(userId)) {
      return [y, x, count];
      //自分の石と対になる
    }
  }
  return [111];
};

const turnColor = (di: number[], goal: number[], userId: UserId) => {
  if (goal[0] !== 111) {
    while (goal[2] >= 0) {
      board[goal[0]][goal[1]] = colorUseCase.createColor(userId);
      goal[0] -= di[0];
      goal[1] -= di[1];
      goal[2] -= 1;
    }
  }
};
export const boardUseCase = {
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId) => {
    console.log(111, x, y);
    //ここに挟まれた石を反転させる処理させればいいんじゃない
    for (const di of directions) {
      if (0 < x + di[1] && x + di[1] < 8 && 0 < y + di[0] && y + di[0] < 8) {
        if (board[y + di[0]][x + di[1]] === 3 - colorUseCase.createColor(userId)) {
          turnColor(di, next(x + di[1], y + di[0], di[1], di[0], userId, 1), userId);
        }
      }
    }

    return board;
  },
};
