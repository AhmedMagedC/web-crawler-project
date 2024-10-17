function printReport(pages) {
  console.log("======================");
  console.log("REPORT");
  console.log("======================");
  for (const page of pages) {
    console.log(`URL (${page[0]}) appeared ${page[1]} times`);
  }
  console.log("======================");
  console.log("END REPORT");
  console.log("======================");
}

function sortPages(pages) {
  pages.sort((a, b) => {
    return b[1] - a[1];
  });
  return pages;
}

module.exports = {
  sortPages,
  printReport,
};
