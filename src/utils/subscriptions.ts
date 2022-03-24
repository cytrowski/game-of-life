import { Position } from "./position";

export type SubscriptionCallback = (state: boolean) => void;
export type Observe = (callback: SubscriptionCallback) => void;
export interface Observer {
  key: string;
  observe?: Observe;
}

type Emit = (state: boolean) => void;

interface Subscription {
  emit: Emit;
  observe: Observe;
}

export const makeSubscription = (): Subscription => {
  let subscriptionCallback: SubscriptionCallback | null;

  const observe: Observe = (callback) => {
    subscriptionCallback = callback;
    return () => {
      subscriptionCallback = null;
    };
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

export type SubscriptionsMap = Map<Position, Subscription>;

export const generateSubscriptionsForPositions = (
  positions: Position[]
): SubscriptionsMap =>
  new Map(positions.map((position) => [position, makeSubscription()]));
