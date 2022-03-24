import { generatePositions, Position } from "./position";

export type BoardState = Map<Position, true>;

export const generateCells = (quantity: number) => {
  generatePositions(quantity);
};

export const generateInitialStateFromPositions = (
  positions: Position[]
): BoardState =>
  new Map(
    positions
      .filter(() => Math.random() > 0.8)
      .map((position) => [position, true])
  );

export const getLiveCellPositions = (boardState: BoardState): Position[] => {
  let positions: Position[] = [];
  boardState.forEach((value, position) => {
    if (value === true) {
      positions.push(position);
    }
  });
  return positions;
};
