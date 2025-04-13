export async function getDupe(url) {
  fetch('ttp://localhost:3000/api/scrape', {
    method: 'POST',
    body: JSON.stringify(url),
    headers: {
      'Content-Type': 'application/json',
    },
  })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setDupeResult(json);
      })
      .catch((error) => {
        setApiFailed(true);
        seDupeResult([]);
      });
};

// ${targetName}
// ${targetCategory}
// ${targetCopy}
// ${targetImage}
// ${targetPrice}
// ${dupeName}
// ${dupeCategory}
// ${dupeLink}
// ${dupeBrand}
// ${dupeCopy}
// ${dupeImage}
// ${dupePrice}


