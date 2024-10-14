const { crawlPage } = require("./crawl.js");

function main() {
  if (process.argv.length === 3) {
    console.log(`started crawling...`);
    crawlPage(process.argv[2])
  } else {
    console.log(
      "invalid command argument! you should write 'npm start website-url'"
    );
    process.exit(1);
  }
}

main();
