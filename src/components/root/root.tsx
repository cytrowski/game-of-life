import { useMemo } from "react";
import type { Observer } from "../../utils/subscriptions";

import { Cell } from "../cell/cell";

import classNames from "./root.module.css";

interface Props {
  observers: Observer[];
}

export const Root = ({ observers }: Props) => {
  const customStyle = useMemo(
    () =>
      ({ "--board-size": Math.sqrt(observers.length) } as React.CSSProperties),
    []
  );

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
