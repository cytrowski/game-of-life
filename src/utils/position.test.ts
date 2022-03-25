import {
  makeKeyFromPosition,
  buildPositionsDictionary,
  generatePositions,
  getNeighbourKeys,
} from "./position";

describe("makeKeyFromPosition", () => {
  it("returns key based on position", () => {
    const position = { x: 10, y: 20 };

    const result = makeKeyFromPosition(position);

    expect(result).toBe("10:20");
  });
});

describe("buildPositionsDictionary", () => {
  it("creates dictionary Map matching keys to positions", () => {
    const positions = [
      { x: 1, y: 2 },
      { x: 0, y: 3 },
    ];

    const result = buildPositionsDictionary(positions);

    expect(result.size).toBe(2);

    expect(result.get("1:2")).toBe(positions[0]);
    expect(result.get("0:3")).toBe(positions[1]);
  });
});

describe("generatePositions", () => {
  it.each([
    {
      boardSize: 2,
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
    },
    {
      boardSize: 3,
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
    },
  ])("generates positions array", ({ boardSize, positions }) => {
    const result = generatePositions(boardSize);
    expect(result).toEqual(positions);
  });
});

describe("getNeighbourKeys", () => {
  it.each([
    {
      position: { x: 1, y: 1 },
      keys: ["0:0", "0:1", "0:2", "1:0", "1:2", "2:0", "2:1", "2:2"],
    },
    {
      position: { x: 0, y: 0 },
      keys: ["-1:-1", "-1:0", "-1:1", "0:-1", "0:1", "1:-1", "1:0", "1:1"],
    },
  ])("returns array of keys of neighbour cells", ({ position, keys }) => {
    const result = getNeighbourKeys(position);
    expect(result).toEqual(keys);
  });
});
