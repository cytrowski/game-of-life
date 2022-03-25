import { generateSubscriptionsForPositions } from "./subscriptions";

describe("generateSubscruptionsFromPositions", () => {
  const positions = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ];

  it("returns a Map with proper keys", () => {
    const result = generateSubscriptionsForPositions(positions);

    expect(result.has(positions[0])).toBe(true);
    expect(result.has(positions[1])).toBe(true);
  });

  it("returns a Map with working subscriptions", () => {
    const result = generateSubscriptionsForPositions(positions);

    const firstSubscription = result.get(positions[0]);

    expect(firstSubscription).toBeDefined();

    const callback = jest.fn();

    firstSubscription?.observe(callback);
    firstSubscription?.emit(true);

    expect(callback).toHaveBeenCalledWith(true);

    firstSubscription?.emit(false);

    expect(callback).toHaveBeenCalledWith(false);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
