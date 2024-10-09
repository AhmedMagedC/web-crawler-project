const { normalizeURLs } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURLs strip protocols", () => {
  const input = "https://youtube.com/path/test";
  const actual = normalizeURLs(input);
  const expected = "youtube.com/path/test";
  expect(actual).toEqual(expected);
});

test("normalizeURLs strip query params", () => {
  const input = "https://youtube.com/path/test?name=ahmed&level=34&loc=cairo";
  const actual = normalizeURLs(input);
  const expected = "youtube.com/path/test";
  expect(actual).toEqual(expected);
});

test("normalizeURLs strip trailing slashes", () => {
  const input = "https://youtube.com/path/test/";
  const actual = normalizeURLs(input);
  const expected = "youtube.com/path/test";
  expect(actual).toEqual(expected);
});

test("normalizeURLs lowering the uppercase letters (domain name only)", () => {
  const input = "HTTPS://YOUTUBE.COM";
  const actual = normalizeURLs(input);
  const expected = "youtube.com";
  expect(actual).toEqual(expected);
});

test("normalizeURLs strip the redundant path segments", () => {
  const input = "https://developer.mozilla.org/en-US/./blog/";
  const actual = normalizeURLs(input);
  const expected = "developer.mozilla.org/en-US/blog";
  expect(actual).toEqual(expected);
});

test("normalizeURLs strip the port number", () => {
  const input = "https://developer.mozilla.org:443/en-US/./blog/";
  const actual = normalizeURLs(input);
  const expected = "developer.mozilla.org/en-US/blog";
  expect(actual).toEqual(expected);
});
