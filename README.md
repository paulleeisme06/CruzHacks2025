# CruzHacks2025
Team Members: Bodie, Luis, Paul, Judy
Project Name: Aether

Technical Overview:
Our project is an AI-powered chatbot tool inspired by platforms like Dupe.com, specifically designed for discovering fragrance alternatives. The core idea is to allow users to prepend our service URL (e.g., fragrancefinder.ai) to the URL of any high-end fragrance product page they are browsing. Our system then provides a curated list of similar or more affordable "dupes" based on that target fragrance.

Frontend:
The application features a React-based frontend that utilizes React Router and useParams to extract the target URL (the fragrance website being searched) appended after our own. The UI is responsive, accessible, and displays results using React component templating.

Backend/API:
The backend is built with Node.js and Express, exposing a RESTful API that receives the target fragrance URL. We use Puppeteer, a headless browser automation tool, to scrape the HTML content of the given page.

AI Integration:
The scraped HTML is sent to Google’s Gemini API with a pre-defined prompt designed to extract key information. If the content cannot be scraped or does not relate to a fragrance product, a 404 response is returned to the frontend. Otherwise, the Gemini API extracts the name of the fragrance and classifies it into one of several predefined categories (e.g., floral, smoky, woody, citrus).

Database and Matching Logic:
The extracted fragrance data is compared against a proprietary PostgreSQL database of known dupe fragrances, which runs in a Docker container. If a direct match is found, the system returns relevant data and links, along with LLM-generated product descriptions and comparisons. If no direct dupe exists, the system performs a category-based similarity match and returns suggested alternatives, again enhanced with AI-generated comparative copy.

Frontend Display:
The React frontend dynamically displays product images, descriptions, and links in a user-friendly layout. The design ensures clarity, usability, and ease of navigation for users exploring fragrance options.


