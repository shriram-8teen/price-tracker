import axios from "axios";
import * as cheerio from "cheerio";

const getPriceFromWebsite = async (url) => {
  try {
    const { data } = await axios.get(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const $ = cheerio.load(data);
    let price = $("span.price, div.price, span#priceblock_ourprice, span.a-price-whole").first().text();
    price = price.replace(/[^0-9]/g, "");
    return parseInt(price, 10);
  } catch (err) {
    console.error("❌ Error fetching price:", err.message);
    return null;
  }
};

export default getPriceFromWebsite;
