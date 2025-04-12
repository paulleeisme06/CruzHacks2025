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
 * - Standardized name (optional if already extracted)
 * - One of: masculine or feminine
 * - Marketing copy for the fragrance
 *
 * @param {{ name: string, description: string, image?: string }} scrapedData
 * @returns {Promise<{ name: string, category: string, copy: string }>}
 */
export async function analyzeFragranceWithGemini(scrapedData) {
  if (!scrapedData?.description) {
    throw new Error('Missing fragrance description');
  }

  const prompt = `
  You are a fragrance marketing expert.
  Given the following fragrance information, do three things:
  1. Standardize and extract the name of the fragrance.
  2. Categorize it strictly as exactly one of the following categories: ${categories}
  3. Write a concise product description of 2-3 sentences suitable for a retail store.
  
  Return your entire response as a valid JSON object with the following keys: "name", "category", and "copy". Ensure there is no additional text or markdown formatting outside of the JSON structure.
  
  Fragrance Info:
  Name: ${scrapedData.name || 'Unknown'}
  Description: ${scrapedData.description}
  Image: ${scrapedData.image || 'None'}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    // Attempt to parse the entire text
    const parsed = JSON.parse(text);
    if (!parsed.name || !parsed.category || !parsed.copy) {
      throw new Error('Missing expected keys in Gemini response');
    }
    return parsed;
  } catch (err) {
    // console.error('Error parsing Gemini response (attempt 1):', text);
    // Attempt to find the JSON object within the text (in case of extra text)
    const jsonStartIndex = text.indexOf('{');
    const jsonEndIndex = text.lastIndexOf('}');

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonStartIndex < jsonEndIndex) {
      const potentialJson = text.substring(jsonStartIndex, jsonEndIndex + 1);
      try {
        const parsed = JSON.parse(potentialJson);
        if (!parsed.name || !parsed.category || !parsed.copy) {
          throw new Error('Missing expected keys in Gemini response (attempt 2)');
        }
        // console.log('Successfully parsed JSON after extracting:', potentialJson);
        return parsed;
      } catch (secondErr) {
        // console.error('Error parsing extracted JSON:', potentialJson, secondErr);
        throw new Error('Invalid JSON returned from Gemini (after extraction)');
      }
    } else {
      throw new Error('Could not find valid JSON structure in Gemini response');
    }
  }
}
