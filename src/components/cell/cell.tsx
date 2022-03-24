import { memo } from "react";
import classNames from "./cell.module.css";

interface Props {
  x: number;
  y: number;
}

export const Cell = memo<Props>(({ x, y }) => {
  return <div className={classNames.cell}></div>;
});
