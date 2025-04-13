import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    setTimeout(() => {
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
        position: 'relative',
        minHeight: '100vh',
        overflowY: 'auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Image */}
      <img
        src="/spritzbackground.png"
        alt="Background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Content Container */}
      <div
        style={{
          margin: '80px auto',
          maxWidth: '1000px',
          width: '90%',
          background: '#F4F4F4',
          borderRadius: '30px',
          padding: '40px 30px',
          minHeight: '80vh', // taller
          boxSizing: 'border-box',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              fontSize: 'clamp(20px, 3vw, 32px)',
              color: '#FFFFF',
              fontFamily: 'Playfair',
              fontWeight: 'bold',
              marginTop: '50px',
            }}
          >
            <div className="spinner"></div>
            <div>Loading...</div>
          </div>
        ) : (
          <>
            <h2
              style={{
                textAlign: 'center',
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontFamily: 'Playfair, serif',
                fontWeight: '400',
                marginBottom: '30px',
                color: '#333',
              }}
            >
              Search Results for:{' '}
              <span style={{ color: '#FF662F' }}>{searchQuery}</span>
            </h2>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              {results.slice(0, 2).map((result) => (
                <div
                  key={result.id}
                  style={{
                    background: '#D9D9D9',
                    padding: '30px 20px',
                    borderRadius: '30px',
                    margin: '40px',
                    width: '250px',
                    minHeight: '400px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    boxSizing: 'border-box',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <h3
                    style={{
                      fontSize: 'clamp(18px, 2.5vw, 22px)',
                      fontFamily: 'Playfair, serif',
                      color: '#333',
                      fontWeight: 'bold',
                    }}
                  >
                    {result.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(14px, 2vw, 16px)',
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
          </>
        )}
      </div>

      {/* Spinner CSS */}
      <style>
        {`
          .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #4e73df;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
            margin: 0 auto 20px auto;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SearchResultsPage;

