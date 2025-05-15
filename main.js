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
   "https://www.mvlempyr.com/novel/adorable-treasured-fox-divine-doctor-mother-overturning-the-heavens",
        "https://www.mvlempyr.com/novel/advent-of-the-archmage",
        "https://www.mvlempyr.com/novel/advent-of-the-three-calamities",
        "https://www.mvlempyr.com/novel/adventurer-of-many-professions",
        "https://www.mvlempyr.com/novel/aether-beasts",
        "https://www.mvlempyr.com/novel/aether-chronicles-birth-of-a-legend",
        "https://www.mvlempyr.com/novel/aetheral-space",
        "https://www.mvlempyr.com/novel/aetheric-chronicles-reborn-as-an-extra",
        "https://www.mvlempyr.com/novel/affinity-chaos",
        "https://www.mvlempyr.com/novel/after-an-infinite-flow-player-retires",
        "https://www.mvlempyr.com/novel/after-breaking-up-my-ex-asked-me-to-win-her-back",
        "https://www.mvlempyr.com/novel/after-brushing-face-at-the-apocalypses-boss-for-363-days",
        "https://www.mvlempyr.com/novel/after-defying-the-villains-fate-for-nine-lifetimes-the-heroines-turn-mad",
        "https://www.mvlempyr.com/novel/after-descending-the-mountain-seven-big-brothers-spoil-me",
        "https://www.mvlempyr.com/novel/after-divorce-i-inherited-the-games-fortune",
        "https://www.mvlempyr.com/novel/after-divorcing-my-celebrity-wife-i-became-the-worlds-richest-person",
        "https://www.mvlempyr.com/novel/after-leaving-the-team-the-adventurer-ladies-regretted-it-deeply",
        "https://www.mvlempyr.com/novel/after-rebirth-i-rejected-the-rich-yandere-lady",
        "https://www.mvlempyr.com/novel/after-stealing-heros-mother-i-reincarnated-in-the-fantasy-world",
        "https://www.mvlempyr.com/novel/after-surviving-the-apocalypse-i-built-a-city-in-another-world",
        "https://www.mvlempyr.com/novel/after-the-divorce-i-could-hear-the-voice-of-the-future",
        "https://www.mvlempyr.com/novel/after-the-vicious-cannon-fodder-was-reborn",
        "https://www.mvlempyr.com/novel/after-transformation-mine-and-her-wild-fantasy",
        "https://www.mvlempyr.com/novel/after-transmigrating-as-a-tycoons-wife-my-thoughts-are-heard-by-the-whole-family",
        "https://www.mvlempyr.com/novel/after-transmigrating-into-a-short-lived-white-moonlight-had-a-he-with-the-villain",
        "https://www.mvlempyr.com/novel/after-using-cheats-i-became-the-strongest-beast-tamer",
        "https://www.mvlempyr.com/novel/against-heavens-will",
        "https://www.mvlempyr.com/novel/against-the-gods",
        "https://www.mvlempyr.com/novel/against-the-true-gods",
        "https://www.mvlempyr.com/novel/age-of-adepts",
        "https://www.mvlempyr.com/novel/ai-doctor-from-slave-to-beast-king",
        "https://www.mvlempyr.com/novel/akashic-records-of-the-bastard-child-engaged-to-a-goddess",
        "https://www.mvlempyr.com/novel/akuyaku-reijou-ni-nanka-narimasen-watashi-wa-futsuu-no-koushaku-reijou-desu",
        "https://www.mvlempyr.com/novel/akuyaku-reijou-wa-danna-sama-wo-yasesasetai",
        "https://www.mvlempyr.com/novel/alantina-online-the-greatest-sword-mage-reborn-as-a-weak-npc",
        "https://www.mvlempyr.com/novel/alchemist-in-the-apocalypse-rise-of-a-legend",
        "https://www.mvlempyr.com/novel/all-round-mid-laner",
        "https://www.mvlempyr.com/novel/all-rounder-artist",
        "https://www.mvlempyr.com/novel/all-the-heroines-are-my-ex-girlfriends",
        "https://www.mvlempyr.com/novel/allure-of-the-night",
        "https://www.mvlempyr.com/novel/almighty-father-system",
        "https://www.mvlempyr.com/novel/alpha-culinary-love",
        "https://www.mvlempyr.com/novel/alpha-instinct",
        "https://www.mvlempyr.com/novel/although-i-am-only-level-1-but-with-this-unique-skill-i-am-the-strongest",
        "https://www.mvlempyr.com/novel/altina-the-sword-princess",
        "https://www.mvlempyr.com/novel/am-i-a-crispy-college-student-the-whole-internet-says-that-im-hard-to-kill",
        "https://www.mvlempyr.com/novel/america-1919",
        "https://www.mvlempyr.com/novel/america-tycoon-the-wolf-of-showbiz",
        "https://www.mvlempyr.com/novel/american-exorcism-male-god",
        "https://www.mvlempyr.com/novel/american-tax-officer",
        "https://www.mvlempyr.com/novel/amon-the-legendary-overlord",
        "https://www.mvlempyr.com/novel/an-a-ranked-adventurers-slow-living",
        "https://www.mvlempyr.com/novel/an-extras-pov",
        "https://www.mvlempyr.com/novel/an-extras-rise-in-an-eroge",
        "https://www.mvlempyr.com/novel/an-otome-games-burikko-villainess-turned-into-a-magic-otaku",
        "https://www.mvlempyr.com/novel/an-owls-rise",
        "https://www.mvlempyr.com/novel/ancestral-lineage",
        "https://www.mvlempyr.com/novel/ancestral-wealth-inheritance-system",
        "https://www.mvlempyr.com/novel/ancient-dragon-elephant-technique",
        "https://www.mvlempyr.com/novel/ancient-godly-monarch",
        
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
