import { Cell } from "../cell/cell";
import classNames from "./root.module.css";

const size = 50;
const cells = Array.from({ length: size * size }, (_, i) => ({
  x: i % size,
  y: Math.floor(i / size),
}));

export const Root = () => {
  return (
    <div className={classNames.container}>
      <div className={classNames.board}>
        {cells.map(({ x, y }) => {
          return <Cell key={`${x}:${y}`} x={x} y={y} />;
        })}
      </div>
    </div>
  );
};
