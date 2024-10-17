const { JSDOM } = require("jsdom");

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseURLObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);
  if (baseURLObj.hostname !== currentUrlObj.hostname) return pages;

  pages[normalizeURLs(currentUrl)] =
    pages[normalizeURLs(currentUrl)] === undefined
      ? 1
      : pages[normalizeURLs(currentUrl)] + 1;

  if (pages[normalizeURLs(currentUrl)] > 1) return pages;

  console.log(`currently crawling : ${currentUrl}`);
  try {
    const resp = await fetch(currentUrl);
    if (resp.status > 399) {
      console.log(
        `couldn't retrieve the web page due to error with status code : ${resp.status}`
      );
    } else if (!resp.headers.get("content-type").includes("text/html")) {
      console.log(
        `didn't receive an HTML document , instead got ${resp.headers.get(
          "content-type"
        )} type of data`
      );
    } else {
      const content = await resp.text();
      const extractedURLs = getURLsFromHTML(content, baseUrl);

      for (const url of extractedURLs) {
        pages = await crawlPage(baseUrl, url, pages);
      }
    }
  } catch (err) {
    console.log(`error! ${err.message}`);
  }
  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  let domObj = new JSDOM(htmlBody);
  let links = domObj.window.document.links;
  let extractedURLs = [];
  for (const link of links) {
    let fullURL;
    if (link.href.startsWith("/")) fullURL = `${baseURL}${link.href}`;
    else fullURL = link.href;
    try {
      let urlObj = new URL(fullURL);
      extractedURLs.push(urlObj.href);
    } catch (err) {
      console.log(`error occured! ${err.message} : ${fullURL}`);
    }
  }
  return extractedURLs;
}

function normalizeURLs(StringURL) {
  let url = new URL(StringURL);
  let normalizedURL = `${url.hostname}${url.pathname}`;
  if (normalizedURL.endsWith("/")) normalizedURL = normalizedURL.slice(0, -1);

  return normalizedURL;
}

module.exports = {
  normalizeURLs,
  getURLsFromHTML,
  crawlPage,
};
