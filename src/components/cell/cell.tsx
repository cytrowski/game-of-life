import { memo, useEffect, useState } from "react";
import { Observe } from "../../utils/subscriptions";
import classNames from "./cell.module.css";
interface Props {
  observe?: Observe;
}

export const Cell = memo<Props>(({ observe }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (!observe) {
      return;
    }
    return observe(setState);
  }, [observe]);

  const className = `${classNames.cell} ${
    state ? classNames.alive : classNames.dead
  }`;

  return <div className={className} />;
});
