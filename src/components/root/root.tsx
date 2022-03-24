import { Cell, Observe, SubscriptionCallback } from "../cell/cell";
import classNames from "./root.module.css";

interface Position {
  x: number;
  y: number;
}

const size = 50;
const positions: Position[] = Array.from({ length: size * size }, (_, i) => ({
  x: i % size,
  y: Math.floor(i / size),
}));

const makeKey = ({ x, y }: Position) => `${x}:${y}`;

type Emit = (state: boolean) => void;

interface Subscription {
  emit: Emit;
  observe: Observe;
}

const makeSubscription = () => {
  let subscriptionCallback: SubscriptionCallback;

  const observe: Observe = (callback) => {
    subscriptionCallback = callback;
  };

  const emit: Emit = (state) => {
    if (subscriptionCallback) {
      subscriptionCallback(state);
    }
  };

  return {
    emit,
    observe,
  };
};

const subscriptions: { [key: string]: Subscription } = Object.fromEntries(
  positions.map((position) => [makeKey(position), makeSubscription()])
);

const initialState = positions.map((position) => ({
  key: makeKey(position),
  state: Math.random() > 0.8,
}));

setInterval(() => {
  initialState.map(({ key, state }) => subscriptions[key].emit(state));
}, 1000);

export const Root = () => {
  return (
    <div className={classNames.container}>
      <div className={classNames.board}>
        {positions.map((position) => {
          const key = makeKey(position);
          return <Cell key={key} observe={subscriptions[key].observe} />;
        })}
      </div>
    </div>
  );
};
