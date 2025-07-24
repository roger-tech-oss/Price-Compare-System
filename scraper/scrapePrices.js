// scraper/scrapePrices.js
const axios = require("axios");
const cheerio = require("cheerio");
const admin = require("firebase-admin");
const serviceAccount = require("./your-service-account.json"); // Download this from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

async function scrapeProductPrices(product) {
  const results = [];

  for (const url of product.urls) {
    try {
      const { data } = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0", // prevent bot blocks
        },
      });
      const $ = cheerio.load(data);
      let price = "N/A";

      if (url.includes("amazon")) {
        price = $("#priceblock_ourprice").text().trim() || $("#priceblock_dealprice").text().trim();
      } else if (url.includes("flipkart")) {
        price = $("._30jeq3").first().text().trim();
      } else if (url.includes("ebay")) {
        price = $("#prcIsum").text().trim();
      }

      results.push({ url, price });
    } catch (err) {
      results.push({ url, price: "Error" });
    }
  }

  return results;
}

async function updateAllProductPrices() {
  const productsRef = db.collection("products");
  const snapshot = await productsRef.get();

  for (const doc of snapshot.docs) {
    const product = doc.data();
    const prices = await scrapeProductPrices(product);

    await doc.ref.update({ prices }); // store prices in Firestore
    console.log(`Updated ${product.name}`);
  }
}

updateAllProductPrices()
  .then(() => {
    console.log("All prices updated.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Scraping failed:", err);
    process.exit(1);
  });
