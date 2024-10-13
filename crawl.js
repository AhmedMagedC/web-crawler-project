const { JSDOM } = require("jsdom");

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
      console.log(`error occured! ${err.message}`);
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
};
