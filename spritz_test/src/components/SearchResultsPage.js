import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DupeContext from '../context/DupeContext';
import { getDupe } from '../api/getDupe'; // adjust path to your actual file
export async function getDupe(url, setDupeResult, setApiFailed, setLoading) {
  try {
    const response = await fetch('http://localhost:3000/api/scrape', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('API call failed');
    const json = await response.json();

    setDupeResult(json);
    setApiFailed(false);
  } catch (error) {
    setApiFailed(true);
    setDupeResult(null);
  } finally {
    setLoading(false);
  }
}

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  const [loading, setLoading] = useState(true);
  const { dupeResult, setDupeResult, apiFailed, setApiFailed } = useContext(DupeContext);

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    getDupe(searchQuery, setDupeResult, setApiFailed, setLoading);
  }, [searchQuery]);

  const handleNewSearch = () => {
    navigate('/');
  };

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
      {/* Background */}
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
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
        }}
      />

      {/* Content */}
      <div
        style={{
          margin: '80px auto',
          maxWidth: '1000px',
          width: '90%',
          background: '#F4F4F4',
          borderRadius: '30px',
          padding: '40px 30px',
          boxSizing: 'border-box',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        <button
          onClick={handleNewSearch}
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            backgroundColor: '#FF662F',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Start a New Search
        </button>

        {loading ? (
          <div
            style={{
              textAlign: 'center',
              fontSize: 'clamp(20px, 3vw, 32px)',
              color: '#000', // Now black
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
              Top Match for: <span style={{ color: '#FF662F' }}>{searchQuery}</span>
            </h2>

            
              <div
                key={id}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '30px',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                }}
              >
                {/* Left: User Input */}
                <div
                  style={{
                    background: '#FFF',
                    borderRadius: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    padding: '20px',
                    flex: '1 1 400px',
                    maxWidth: '450px',
                  }}
                >
                  <h3 style={{ fontFamily: 'Playfair', fontSize: '22px', color: '#333' }}>
                    🔍 You Searched:
                  </h3>
                  <img
                    src={dupeResult?.targetImage}
                    alt={dupeResult?.targetImage}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      marginTop: '10px',
                      marginBottom: '15px',
                    }}
                  />
                  <p><strong>Name:</strong> {dupeResult?.targetName}</p>
                  <p><strong>Category:</strong> {dupeResult?.targetCategory}</p>
                  <p><strong>Description:</strong> {dupeResult?.targetCopy}</p>
                  <p><strong>Price:</strong> ${dupeResult?.targetPrice}</p>
                </div>

                {/* Right: Top Match */}
                <div
                  style={{
                    background: '#FFF7F3',
                    borderRadius: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    padding: '20px',
                    flex: '1 1 400px',
                    maxWidth: '450px',
                  }}
                >
                  <h3 style={{ fontFamily: 'Playfair', fontSize: '22px', color: '#333' }}>
                    🌟 Our Top Match:
                  </h3>
                  <img
                    src={dupeResult?.dupeImage}
                    alt={dupeResult?.dupeImage}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      marginTop: '10px',
                      marginBottom: '15px',
                    }}
                  />
                  <p><strong>Name:</strong> {dupeResult?.dupeName}</p>
                  <p><strong>Category:</strong> {dupeResult?.dupeCategory}</p>
                  <p><strong>Description:</strong> {dupeResult?.dupeCopy}</p>
                  <p><strong>Price:</strong> ${dupeResult?.dupePrice}</p>
                </div>
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
