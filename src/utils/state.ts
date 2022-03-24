import { Position } from "./position";

export type BoardState = Map<Position, true>;

export const generateInitialStateFromPositions = (
  positions: Position[]
): BoardState =>
  new Map(
    positions
      .filter(() => Math.random() > 0.8)
      .map((position) => [position, true])
  );
