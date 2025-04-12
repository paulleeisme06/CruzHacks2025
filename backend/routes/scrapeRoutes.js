import {scrapeProductDetails} from '../services/scraper.js'
import {analyzeFragranceWithGemini} from '../services/gemeni.js'
import pool from '../config/db.js';
export async function findDupes(req, res) {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid or missing URL' });
    }

    const scraped = await scrapeProductDetails(url);
    const result = await analyzeFragranceWithGemini({
      name: scraped.name,
      description: scraped.description,
      image: scraped.image
    });
    res.status(200).json({html: result});
  } catch (err) {
    console.error('Error in findDupes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
