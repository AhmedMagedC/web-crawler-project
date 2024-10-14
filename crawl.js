const { JSDOM } = require("jsdom");

async function crawlPage(url) {
  try{
    const resp = await fetch(url);
    if(resp.status>399){
      console.log(`couldn't retrieve the web page due to error with status code : ${resp.status}`)
      
    }else if(!resp.headers.get('content-type').includes("text/html")){
      console.log(`didn't receive an HTML document , instead got ${resp.headers.get('content-type')} type of data`)
    }else{
      const content=await resp.text()
      console.log(content)
    }
  }catch(err){
    console.log(`error! ${err.message}`)
  }
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
  crawlPage,
};
