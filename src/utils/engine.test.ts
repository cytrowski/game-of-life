import { initialize } from "./engine";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("initialize", () => {
  let result: ReturnType<typeof initialize>;

  beforeEach(() => {
    result = initialize({ gridSize: 10, tickLength: 0 });
  });

  it("returns start and cellObservers", () => {
    expect(result).toHaveProperty("start");
    expect(result).toHaveProperty("cellObservers");
  });

  it("returns start which runs tick", () => {
    result.start();

    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});
