import { memo, useEffect, useRef } from "react";
import { Observe } from "../../utils/subscriptions";
import classNames from "./cell.module.css";
interface Props {
  observe?: Observe;
}

export const Cell = memo<Props>(({ observe }) => {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observe) {
      return;
    }
    return observe((state) => {
      cellRef.current?.classList.toggle(classNames.alive, state);
    });
  }, [observe]);

  return <div className={classNames.cell} ref={cellRef} />;
});
