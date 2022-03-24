import { useEffect, useMemo } from "react";
import type { Observer } from "../../utils/subscriptions";

import { Cell } from "../cell/cell";

import classNames from "./root.module.css";

interface Props {
  observers: Observer[];
  start: () => void;
}

export const Root = ({ observers, start }: Props) => {
  const customStyle = useMemo(
    () =>
      ({ "--board-size": Math.sqrt(observers.length) } as React.CSSProperties),
    [observers.length]
  );

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div className={classNames.container} style={customStyle}>
      <div className={classNames.board}>
        {observers.map(({ key, observe }) => {
          return <Cell key={key} observe={observe} />;
        })}
      </div>
    </div>
  );
};
