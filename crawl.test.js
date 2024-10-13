const { normalizeURLs } = require("./crawl.js");
const { test, expect } = require("@jest/globals");
const { getURLsFromHTML } = require("./crawl.js");

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

test("getURLsFromHTML absolute URL extraction", () => {
  const inputHtmlBody = `
<html>
  <body>
    <a href="https://youtube.com/">youtube</a>
  </body>
</html>`;
  const inputBaseUrl = "https://youtube.com";
  const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl);
  const expected = ["https://youtube.com/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative URL extraction", () => {
  const inputHtmlBody = `
<html>
  <body>
    <a href="/watch/">youtube watch</a>
  </body>
</html>`;
  const inputBaseUrl = "https://youtube.com";
  const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl);
  const expected = ["https://youtube.com/watch/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML multiple URLs extraction", () => {
  const inputHtmlBody = `
<html>
  <body>
    <a href="/watch/">youtube watch</a>
    <a href="https://youtube.com/">youtube</a>
    <a href="https://github.com/">github</a>
  </body>
</html>`;
  const inputBaseUrl = "https://youtube.com";
  const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl);
  const expected = ["https://youtube.com/watch/","https://youtube.com/","https://github.com/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid URL catch", () => {
  const inputHtmlBody = `
<html>
  <body>
    <a href="/watch/">youtube watch</a>
    <a href="invalid">invalid</a>
    <a href="https://github.com/">github</a>
  </body>
</html>`;
  const inputBaseUrl = "https://youtube.com";
  const actual = getURLsFromHTML(inputHtmlBody,inputBaseUrl);
  const expected = ["https://youtube.com/watch/","https://github.com/"];
  expect(actual).toEqual(expected);
});
