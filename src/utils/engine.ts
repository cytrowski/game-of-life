import {
  buildPositionsDictionary,
  generatePositions,
  getNeighbourKeys,
  makeKeyFromPosition,
  Position,
} from "./position";
import { generateInitialStateFromPositions } from "./state";
import {
  generateSubscriptionsForPositions,
  Observer,
  SubscriptionsMap,
} from "./subscriptions";

type CellsMap = Map<Position, boolean>;

const notifyCells = (
  boardState: CellsMap,
  subscriptionsMap: SubscriptionsMap
) => {
  boardState.forEach((value, position) => {
    const subscription = subscriptionsMap.get(position);
    if (subscription) {
      subscription.emit(value);
    }
  });
};

const updateCellsMap = (target: CellsMap, ...sources: CellsMap[]) => {
  sources.forEach((source) => {
    source.forEach((value, position) => {
      if (value === false) {
        target.delete(position);
      } else {
        target.set(position, true);
      }
    });
  });
};

interface Initialize {
  (options: { gridSize: number; tickLength: number }): {
    cellObservers: Observer[];
    start: () => void;
  };
}

export const initialize: Initialize = ({ gridSize, tickLength }) => {
  const positions = generatePositions(gridSize);

  const positionsDictionary = buildPositionsDictionary(positions);
  const subscriptionsMap = generateSubscriptionsForPositions(positions);
  const aliveCellsMap = generateInitialStateFromPositions(positions);

  const tick = () => {
    const candidates = new Map<Position, { aliveNeighbours: number }>();
    const borningCells = new Map<Position, true>();
    const dyingCells = new Map<Position, false>();

    aliveCellsMap.forEach((_, position) => {
      let aliveNeighbours = 0;

      getNeighbourKeys(position).forEach((key) => {
        const position = positionsDictionary.get(key);
        if (!position) {
          return;
        }
        const isAlive = aliveCellsMap.get(position) !== undefined;

        if (isAlive) {
          aliveNeighbours++;
          return;
        }

        let candidate = candidates.get(position);
        if (candidate === undefined) {
          candidate = { aliveNeighbours: 0 };
        }
        candidate.aliveNeighbours++;
        candidates.set(position, candidate);
      });

      if (aliveNeighbours < 2 || aliveNeighbours > 3) {
        dyingCells.set(position, false);
      }
    });

    candidates.forEach(({ aliveNeighbours }, position) => {
      if (aliveNeighbours === 3) {
        borningCells.set(position, true);
      }
    });

    notifyCells(dyingCells, subscriptionsMap);
    notifyCells(borningCells, subscriptionsMap);
    updateCellsMap(aliveCellsMap, borningCells, dyingCells);

    setTimeout(tick, tickLength);
  };

  const start = () => {
    notifyCells(aliveCellsMap, subscriptionsMap);
    tick();
  };

  const cellObservers: Observer[] = positions.map((position) => {
    return {
      key: makeKeyFromPosition(position),
      observe: subscriptionsMap.get(position)?.observe,
    };
  });

  return { cellObservers, start };
};
