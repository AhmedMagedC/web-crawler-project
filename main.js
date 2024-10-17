const { crawlPage } = require("./crawl.js");

async function main() {
  if (process.argv.length === 3) {
    console.log(`started crawling...`);
    const pages = await crawlPage(process.argv[2], process.argv[2], {});
    for (const page of Object.entries(pages)) console.log(page);
  } else {
    console.log(
      "invalid command argument! you should write 'npm start website-url'"
    );
    process.exit(1);
  }
}

main();
