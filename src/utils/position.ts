export interface Position {
  x: number;
  y: number;
}

export const makeKeyFromPosition = ({ x, y }: Position) => `${x}:${y}`;

export const generatePositions = (boardSize: number): Position[] =>
  Array.from({ length: boardSize * boardSize }, (_, i) => ({
    x: i % boardSize,
    y: Math.floor(i / boardSize),
  }));

export const buildPositionsDictionary = (positions: Position[]) => {
  return new Map(
    positions.map((position) => [makeKeyFromPosition(position), position])
  );
};

const deltas = [-1, 0, 1];
const neighbourOffsets = deltas
  .flatMap((dX) =>
    deltas.map((dY) => {
      return { dX, dY };
    })
  )
  .filter(({ dX, dY }) => dX !== 0 || dY !== 0);

export const getNeighbourKeys = ({ x, y }: Position): string[] => {
  return neighbourOffsets.map(({ dX, dY }) =>
    makeKeyFromPosition({ x: x + dX, y: y + dY })
  );
};
