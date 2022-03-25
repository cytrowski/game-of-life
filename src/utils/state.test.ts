import { generateInitialStateFromPositions } from "./state";

describe("generateInitialStateFromPositions", () => {
  it("generates state from positions", () => {
    const positions = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ];

    const spy = jest.spyOn(global.Math, "random");

    spy.mockReturnValueOnce(0.9);
    spy.mockReturnValueOnce(0.2);
    spy.mockReturnValueOnce(0.8);

    const result = generateInitialStateFromPositions(positions);

    expect(result.size).toBe(1);
    expect(result.has(positions[0])).toBe(true);
    expect(result.has(positions[1])).toBe(false);
    expect(result.has(positions[2])).toBe(false);

    spy.mockRestore();
  });
});
