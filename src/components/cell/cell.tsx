import { memo, useEffect, useState } from "react";
import classNames from "./cell.module.css";

export type SubscriptionCallback = (state: boolean) => void;
export type Observe = (callback: SubscriptionCallback) => void;
interface Props {
  observe: Observe;
}

export const Cell = memo<Props>(({ observe }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    observe(setState);
  }, [observe]);

  const className = `${classNames.cell} ${
    state ? classNames.alive : classNames.dead
  }`;

  return <div className={className} />;
});
