import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate an API call to fetch results based on searchQuery
  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    setTimeout(() => {
      // Simulate search results based on the query
      const fetchedResults = [
        { id: 1, title: `Result for "${searchQuery}" 1`, description: 'Description for Result 1' },
        { id: 2, title: `Result for "${searchQuery}" 2`, description: 'Description for Result 2' },
        { id: 3, title: `Result for "${searchQuery}" 3`, description: 'Description for Result 3' },
      ];
      setResults(fetchedResults);
      setLoading(false);
    }, 1000);
  }, [searchQuery]);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(to right, #4e73df, #1cc88a)',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px',
        color: '#fff',
      }}
    >
      <div
        style={{
          width: 1059,
          height: 685,
          position: 'relative',
          background: '#F4F4F4',
          borderRadius: '30px',
          overflow: 'hidden',
          padding: '30px',
        }}
      >
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              fontSize: '24px',
              color: '#333',
              fontWeight: 'bold',
              marginTop: '50px',
            }}
          >
            Loading...
          </div>
        ) : (
          <div>
            <h2
              style={{
                textAlign: 'center',
                fontSize: '32px',
                fontFamily: 'Playfair, serif',
                fontWeight: '400',
                marginBottom: '30px',
                color: '#333',
              }}
            >
              Search Results for: <span style={{ color: '#4e73df' }}>{searchQuery}</span>
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              {results.map((result) => (
                <div
                  key={result.id}
                  style={{
                    background: '#D9D9D9',
                    padding: '20px',
                    borderRadius: '30px',
                    margin: '10px',
                    width: '250px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '20px',
                      fontFamily: 'Playfair, serif',
                      color: '#333',
                      fontWeight: 'bold',
                    }}
                  >
                    {result.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '16px',
                      color: '#555',
                      marginTop: '10px',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;


// // src/components/SearchResultsPage.js
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const SearchResultsPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get('query');

//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Simulate an API call to fetch results based on searchQuery
//   useEffect(() => {
//     if (!searchQuery) return;

//     setLoading(true);
//     setTimeout(() => {
//       // Simulate search results based on the query
//       const fetchedResults = [
//         { id: 1, title: `Result for "${searchQuery}" 1`, description: 'Description for Result 1' },
//         { id: 2, title: `Result for "${searchQuery}" 2`, description: 'Description for Result 2' },
//         { id: 3, title: `Result for "${searchQuery}" 3`, description: 'Description for Result 3' },
//       ];
//       setResults(fetchedResults);
//       setLoading(false);
//     }, 1000);
//   }, [searchQuery]);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>Search Results for: {searchQuery}</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {results.map((result) => (
//             <li key={result.id} style={{ marginBottom: '20px' }}>
//               <h3>{result.title}</h3>
//               <p>{result.description}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchResultsPage;
