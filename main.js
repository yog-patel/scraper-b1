// main.js
const { launchBrowser } = require("./browser");
const { scrapeNovelDetails, scrapeChapters } = require("./scraper");
const { 
  insertNovel, 
  insertChapters, 
  checkNovelExists,
  getLatestChapterNumber,
  closeDbConnection
} = require("./DatabaseOperations");

// Main execution function
async function main() {

    const urls = [
   "https://www.mvlempyr.com/novel/primordial-villain-with-a-slave-harem",
    "https://www.mvlempyr.com/novel/prince-charming-your-persona-has-collapsed",
    "https://www.mvlempyr.com/novel/princess-medical-doctor",
    "https://www.mvlempyr.com/novel/princesss-struggle-for-survival",
    "https://www.mvlempyr.com/novel/pro-wrestling-system",
    "https://www.mvlempyr.com/novel/profane-prince-of-domination",
    "https://www.mvlempyr.com/novel/progenitor-vampire-i-have-many-skills",
    "https://www.mvlempyr.com/novel/protagonist-antagonist-i-reject-both",
    "https://www.mvlempyr.com/novel/protect-our-clan-leader",
    "https://www.mvlempyr.com/novel/proud-senior-schoolgirl-was-tender-and-sweet-we-fell-in-love",
    "https://www.mvlempyr.com/novel/pulling-together-a-villain-reformation-strategy",
    "https://www.mvlempyr.com/novel/pure-love-insult-complex",
    "https://www.mvlempyr.com/novel/pursuit-of-the-truth",
    "https://www.mvlempyr.com/novel/pushover-extra-trains-the-villainesses",
      "https://www.mvlempyr.com/novel/qi-cultivation-starting-from-the-repair-panel",
  "https://www.mvlempyr.com/novel/quick-transmigrating-second-female-leads-counterattack",
  "https://www.mvlempyr.com/novel/quick-transmigration-cannon-fodders-record-of-counterattacks",
  "https://www.mvlempyr.com/novel/quick-transmigration-goddess-of-my-imagination",
  "https://www.mvlempyr.com/novel/quick-transmigration-heroine-arrives-woman-rapidly-retreats",
  "https://www.mvlempyr.com/novel/quick-transmigration-homewrecker-system",
  "https://www.mvlempyr.com/novel/quick-transmigration-rescuing-the-blackened-male-lead",
  "https://www.mvlempyr.com/novel/quick-transmigration-system-male-god-come-here",
          "https://www.mvlempyr.com/novel/raising-a-few-wives-in-a-beast-apocalypse",
    "https://www.mvlempyr.com/novel/rakish-little-immortal-doctor",
    "https://www.mvlempyr.com/novel/rakuin-no-monshou",
    "https://www.mvlempyr.com/novel/ranking-system",
    "https://www.mvlempyr.com/novel/rather-than-the-son-ill-take-the-father",
    "https://www.mvlempyr.com/novel/re-awakened-i-ascend-as-an-sss-ranked-dragon-summoner",
    "https://www.mvlempyr.com/novel/re-awakening-i-ascend-with-a-legendary-class",
    "https://www.mvlempyr.com/novel/re-awakening-i-became-a-pay-to-win-boss-monster",
    "https://www.mvlempyr.com/novel/re-birth-of-a-genius-creator-destroyer",
    "https://www.mvlempyr.com/novel/re-birth-the-beginning-after-the-end",
    "https://www.mvlempyr.com/novel/re-blood-and-iron",
    "https://www.mvlempyr.com/novel/re-evolution-online",
    "https://www.mvlempyr.com/novel/re-in-my-bloody-hit-novel",
    "https://www.mvlempyr.com/novel/re-monster",
    "https://www.mvlempyr.com/novel/re-my-dragon-girlfriend-in-the-dragonic-apocalypse",
    "https://www.mvlempyr.com/novel/re-perverted-sugar-daddy-system",
    "https://www.mvlempyr.com/novel/re-player",
    "https://www.mvlempyr.com/novel/re-zero-kara-hajimeru-isekai-seikatsu-wn",
    "https://www.mvlempyr.com/novel/reaching-the-age-of-thirty-my-income-randomly-doubled",
    "https://www.mvlempyr.com/novel/reader",
    "https://www.mvlempyr.com/novel/realizer-of-death-the-reaper",
    "https://www.mvlempyr.com/novel/realm-of-myths-and-legends",
    "https://www.mvlempyr.com/novel/realms-in-the-firmament",
    "https://www.mvlempyr.com/novel/reapers-resurgence-a-system-reset",
    "https://www.mvlempyr.com/novel/reawakening-sss-rank-villains-pov",
    "https://www.mvlempyr.com/novel/rebirth-100-days-before-doomsday",
    "https://www.mvlempyr.com/novel/rebirth-as-a-wind-cultivator",
    "https://www.mvlempyr.com/novel/rebirth-childhood-friend-of-the-heroine",
    "https://www.mvlempyr.com/novel/rebirth-from-ordinary-person-to-the-strongest",
    "https://www.mvlempyr.com/novel/rebirth-in-journey-to-the-west-sun-wukong",
    "https://www.mvlempyr.com/novel/rebirth-love-me-again",
    "https://www.mvlempyr.com/novel/rebirth-of-a-cannon-fodder-from-a-novel",
    "https://www.mvlempyr.com/novel/rebirth-of-a-movie-star",
    "https://www.mvlempyr.com/novel/rebirth-of-a-star-general",
    "https://www.mvlempyr.com/novel/rebirth-of-an-abandoned-woman",
    "https://www.mvlempyr.com/novel/rebirth-of-billionaires-wife",
    "https://www.mvlempyr.com/novel/rebirth-of-mc",
    "https://www.mvlempyr.com/novel/rebirth-of-the-evil-mother-in-law",
    


        
      ];

    const browser = await launchBrowser();

    try {
        for (let url of urls) {
            console.log(`Scraping novel from URL: ${url}`);
            const page = await browser.newPage();

            try {
                // Set up the page
                await page.setUserAgent(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                );
                await page.goto(url, { waitUntil: "networkidle2" });

                // // Scrape novel details
                // const novelData = await scrapeNovelDetails(page);
                // console.log("Novel information:", novelData);

                // if (!novelData.title || !novelData.author) {
                //     console.log("Missing essential novel data (title or author). Exiting.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Store novel in database or get existing ID
                // const novelId = await insertNovel({
                //     title: novelData.title,
                //     author: novelData.author,
                //     description: novelData.synopsis,
                //     cover_image_url: novelData.imageLink,
                //     tags: novelData.tags,
                //     genres: novelData.genres,
                //     status: novelData.status,
                // });

                // if (!novelId) {
                //     console.log("Failed to process novel data. Skipping.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Get latest chapter from DB to determine how many chapters to scrape
                // const latestChapterNumber = await getLatestChapterNumber(novelId);
                // console.log(`Current chapters in database: ${latestChapterNumber}`);
                // console.log(`Total chapters on site: ${novelData.numOfCh}`);

                // if (latestChapterNumber >= novelData.numOfCh) {
                //     console.log("Novel is already up to date. No new chapters to scrape.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Calculate how many new chapters to scrape
                // const chaptersToScrape = novelData.numOfCh - latestChapterNumber;
                // console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

                // // Scrape chapters (only the new ones)
                // const scrapedChapters = await scrapeChapters(page, novelData.numOfCh, latestChapterNumber);
                // console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Scrape novel details
        const novelData = await scrapeNovelDetails(page);
        console.log("Novel information:", novelData);

        if (!novelData.title || !novelData.author) {
            console.log("Missing essential novel data (title or author). Exiting.");
            continue;  // Skip this novel and move to the next one
        }

        // Store novel in database or get existing ID
        const novelId = await insertNovel({
            title: novelData.title,
            author: novelData.author,
            description: novelData.synopsis,
            cover_image_url: novelData.imageLink,
            tags: novelData.tags,
            genres: novelData.genres,
            status: novelData.status,
        });

        if (!novelId) {
            console.log("Failed to process novel data. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Get latest chapter from DB to determine how many chapters to scrape
        const latestChapterNumber = await getLatestChapterNumber(novelId);
        
        // Use the most reliable chapter count - prefer numOfCh but fall back to chapters
        // if numOfCh is zero
        const totalChapters = novelData.numOfCh || parseInt(novelData.chapters) || 0;
        
        console.log(`Current chapters in database: ${latestChapterNumber}`);
        console.log(`Total chapters on site: ${totalChapters}`);

        if (latestChapterNumber >= totalChapters || totalChapters === 0) {
            console.log("Novel is already up to date or no chapters found. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Calculate how many new chapters to scrape
        const chaptersToScrape = totalChapters - latestChapterNumber;
        console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

        // Scrape chapters (only the new ones)
        const scrapedChapters = await scrapeChapters(page, totalChapters, latestChapterNumber);
        console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Store new chapters in database
                if (scrapedChapters.length > 0) {
                    const newChaptersCount = await insertChapters(novelId, scrapedChapters);
                    console.log(`${newChaptersCount} new chapters stored in database with Novel ID: ${novelId}`);
                } else {
                    console.log("No new chapters to store.");
                }

            } catch (error) {
                console.error(`Error during scraping URL: ${url}`, error);
            } finally {
                // Close the page after scraping
                await page.close();
            }
        }

    } catch (error) {
        console.error("Error during scraping process:", error);
    } finally {
        // Close browser when done
        await browser.close();
        // Close database connection
        await closeDbConnection();
        console.log("Scraping process completed");
    }
}

// Execute the main function
main().catch(console.error);
