import styles from './cell.module.css';
export const Cell = (plops: { color: number; onClick: () => void }) => {
  const { color, onClick } = plops;
  return (
    <div className={styles.cell} onClick={onClick}>
      {color !== 0 && (
        <div
          className={styles.stone}
          style={{
            background: color === 1 ? '#000' : color === 2 ? '#fff' : 'rgba(255, 204, 0,0.7)',
          }}
        />
      )}
    </div>
  );
};
