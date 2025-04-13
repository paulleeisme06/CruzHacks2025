import { GoogleGenerativeAI } from '@google/generative-ai';
import { categories } from './format.js';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
  { model: 'gemini-2.5-pro-exp-03-25' },
  { apiVersion: 'v1beta' }
);

/**
 * Analyze scraped fragrance data using Gemini to get:
 * - Standardized name
 * - One of: masculine or feminine
 * - Marketing copy for the fragrance (2–3 sentence)
 * @param {{ name: string, description: string, image?: string, price?: string }} scrapedData
 * @returns {Promise<{ name: string, category: string, copy: string }>}
 */
export async function analyzeFragranceWithGemini(scrapedData) {
  if (!scrapedData?.description) {
    throw new Error('Missing fragrance description');
  }

  const prompt = `
You are a fragrance marketing expert.
Given the following fragrance information, do five things:
1. Standardize and extract the name of the fragrance.
2. Categorize it strictly as exactly one of the following: ${categories}.
3. Write a concise 2–3 sentence product description that could be used on a product page. If a price is provided, you may include it in the copy if it makes sense.
4. standardize and extract the price (just the number)
5. standardize and extract the exact full link the image

Return your full response as a JSON object with the keys: "name", "category", "copy", "price", and "image". Do not include anything outside of the JSON object.

Fragrance Info:
Name: ${scrapedData.name || 'Unknown'}
Description: ${scrapedData.description}
Image: ${scrapedData.image || 'None'}
Price: ${scrapedData.price || 'Unknown'}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const parsed = JSON.parse(text);
    if (!parsed.name || !parsed.category || !parsed.copy || !parsed.price || !parsed.image) {
      throw new Error('Missing expected keys in Gemini response');
    }
    return parsed;
  } catch (err) {
    const jsonStartIndex = text.indexOf('{');
    const jsonEndIndex = text.lastIndexOf('}');
    if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonStartIndex < jsonEndIndex) {
      const potentialJson = text.substring(jsonStartIndex, jsonEndIndex + 1);
      try {
        const parsed = JSON.parse(potentialJson);
        if (!parsed.name || !parsed.category || !parsed.copy || !parsed.price || !parsed.image) {
          throw new Error('Missing expected keys in Gemini response (attempt 2)');
        }
        return parsed;
      } catch (secondErr) {
        throw new Error('Invalid JSON returned from Gemini (after extraction)');
      }
    } else {
      throw new Error('Could not find valid JSON structure in Gemini response');
    }
  }
}
