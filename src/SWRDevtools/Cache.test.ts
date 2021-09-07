import Cache from "./Cache";
import { expect, test, describe, jest } from "@jest/globals"

describe("Devtools Cache Implementation", () => {
  test("It Creates a Cache", () => {
    expect.assertions(1);
    expect(new Cache()).toEqual({ __cache: new Map(), __listeners: [] });
  });

  test("It gets and sets keys", () => {
    expect.assertions(1);
    const c = new Cache();
    const test = { val: 1 };
    c.set("key", test);
    expect(c.get("key")).toEqual(test);
  })

  test("cache.set accepts keys in multiple formats", () => {
    expect.assertions(1);
    const c = new Cache();
    c.set(() => "test", { "1" : 2});
    expect(c.get("test")).toEqual({ "1": 2 });
  })

  test("Subscribes to a key for changes", () => {
    expect.assertions(2);
    const spy = jest.fn();
    const c = new Cache();
    c.subscribe(spy);
    expect(spy.mock.calls.length).toBe(0);
    c.set("test", {1: 2});
    expect(spy.mock.calls.length).toBe(1);
  })
})