import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { Cell } from 'src/components/cell';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const judge: number[] = [2, 2];
  const turnColor = 1;
  const fetchboard = async () => {
    const res = await apiClient.board.$get().catch(returnNull);
    if (res !== null) {
      setBoard(res);
    }
  };
  const onClick = async (x: number, y: number) => {
    await apiClient.board.$post({ body: { x, y } });
    await fetchboard();
  };

  useEffect(() => {
    const cancelId = setInterval(fetchboard, 500);
    return () => {
      clearInterval(cancelId);
    };
  }, []);
  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)} />
            ))
          )}
        </div>
        <div className={styles.game}>
          {judge[0] + judge[1] === 64 ? (
            <h1>勝者は{judge[0] > judge[1] ? '黒' : '白'}です</h1>
          ) : (
            <h1>今は{turnColor === 1 ? '黒' : '白'}の番です</h1>
          )}
          <h2>黒：{judge[0]}枚</h2> <h2>白：{judge[1]}枚</h2>
        </div>
        <div className={styles.passbotton}>
          <h1>パス</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
