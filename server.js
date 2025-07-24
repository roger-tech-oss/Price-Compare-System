// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

async function scrapePrice(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    if (url.includes("amazon")) {
      const price = $('#priceblock_ourprice, #priceblock_dealprice').first().text().trim();
      return price || "Not found";
    }

    if (url.includes("flipkart")) {
      const price = $('._30jeq3').first().text().trim();
      return price || "Not found";
    }

    if (url.includes("croma")) {
      const price = $('.pdpPrice').first().text().trim();
      return price || "Not found";
    }

    return "Unsupported site";
  } catch (error) {
    console.error("Error scraping:", url, error.message);
    return "Error";
  }
}

app.post("/scrape-prices", async (req, res) => {
  const { links } = req.body;

  if (!Array.isArray(links)) return res.status(400).json({ error: "Links must be an array" });

  const results = await Promise.all(
    links.map(async (url) => {
      const price = await scrapePrice(url);
      return { url, price };
    })
  );

  res.json({ prices: results });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
