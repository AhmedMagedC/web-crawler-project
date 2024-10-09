function normalizeURLs(StringURL) {
  let url = new URL(StringURL);
  let normalizedURL = `${url.hostname}${url.pathname}`;
  if (normalizedURL.endsWith("/")) normalizedURL = normalizedURL.slice(0, -1);

  return normalizedURL;
}

module.exports = {
  normalizeURLs,
};
