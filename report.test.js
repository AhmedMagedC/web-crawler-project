const { test, expect } = require("@jest/globals");
const { sortPages } = require("./report.js");

test("sortPages test on two pages", () => {
  const input = {
    "https://example.com": 2,
    "https://example.com/test": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://example.com/test", 3],
    ["https://example.com", 2],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages test on 5 pages", () => {
  const input = {
    "https://example.com": 2,
    "https://example.com/test/p1": 1,
    "https://example.com/test/p2": 10,
    "https://example.com/test/p3": 35,
    "https://example.com/test/p4": 24,
  };
  const actual = sortPages(input);
  const expected = [
      ["https://example.com/test/p3", 35],
      ["https://example.com/test/p4", 24],
      ["https://example.com/test/p2", 10],
      ["https://example.com", 2],
    ["https://example.com/test/p1", 1],
  ];
  expect(actual).toEqual(expected);
});
