import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    setTimeout(() => {
      const fetchedResults = [
        {
          id: 1,
          userInput: {
            name: searchQuery,
            category: 'Luxury Eau de Parfum',
            copy: 'A captivating blend of citrus and amber for the modern muse.',
            image: '/luxury-perfume.jpg',
            price: '$180',
          },
          topMatch: {
            name: 'Spritz Bloom Essence',
            category: 'Affordable Dupe',
            copy: 'A similar scent profile with fresh notes and lasting power.',
            image: '/spritz-bloom.jpg',
            price: '$39',
          },
        }
      ];
      setResults(fetchedResults);
      setLoading(false);
    }, 1000);
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

            {results.map(({ id, userInput, topMatch }) => (
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
                    src={userInput.image}
                    alt={userInput.name}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      marginTop: '10px',
                      marginBottom: '15px',
                    }}
                  />
                  <p><strong>Name:</strong> {userInput.name}</p>
                  <p><strong>Category:</strong> {userInput.category}</p>
                  <p><strong>Description:</strong> {userInput.copy}</p>
                  <p><strong>Price:</strong> {userInput.price}</p>
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
                    src={topMatch.image}
                    alt={topMatch.name}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      marginTop: '10px',
                      marginBottom: '15px',
                    }}
                  />
                  <p><strong>Name:</strong> {topMatch.name}</p>
                  <p><strong>Category:</strong> {topMatch.category}</p>
                  <p><strong>Description:</strong> {topMatch.copy}</p>
                  <p><strong>Price:</strong> {topMatch.price}</p>
                </div>
              </div>
            ))}
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


// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const SearchResultsPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get('query');

//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!searchQuery) return;

//     setLoading(true);
//     setTimeout(() => {
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
//     <div
//       style={{
//         position: 'relative',
//         minHeight: '100vh',
//         overflowY: 'auto',
//         padding: '20px',
//         boxSizing: 'border-box',
//       }}
//     >
//       {/* Background Image */}
//       <img
//         src="/spritzbackground.png"
//         alt="Background"
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           zIndex: -2,
//         }}
//       />

//       {/* Dark Overlay */}
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           backgroundColor: 'rgba(0, 0, 0, 0.4)',
//           zIndex: -1,
//           pointerEvents: 'none',
//         }}
//       />

//       {/* Content Container */}
//       <div
//         style={{
//           margin: '80px auto',
//           maxWidth: '1000px',
//           width: '90%',
//           background: '#F4F4F4',
//           borderRadius: '30px',
//           padding: '40px 30px',
//           minHeight: '80vh', // taller
//           boxSizing: 'border-box',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         {loading ? (
//           <div
//             style={{
//               textAlign: 'center',
//               fontSize: 'clamp(20px, 3vw, 32px)',
//               color: '#FFFFF',
//               fontFamily: 'Playfair',
//               fontWeight: 'bold',
//               marginTop: '50px',
//             }}
//           >
//             <div className="spinner"></div>
//             <div>Loading...</div>
//           </div>
//         ) : (
//           <>
//             <h2
//               style={{
//                 textAlign: 'center',
//                 fontSize: 'clamp(20px, 3vw, 32px)',
//                 fontFamily: 'Playfair, serif',
//                 fontWeight: '400',
//                 marginBottom: '30px',
//                 color: '#333',
//               }}
//             >
//               Search Results for:{' '}
//               <span style={{ color: '#FF662F' }}>{searchQuery}</span>
//             </h2>

//             <div
//               style={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 justifyContent: 'center',
//                 gap: '20px',
//               }}
//             >
//               {results.slice(0, 2).map((result) => (
//                 <div
//                   key={result.id}
//                   style={{
//                     background: '#D9D9D9',
//                     padding: '30px 20px',
//                     borderRadius: '30px',
//                     margin: '40px',
//                     width: '250px',
//                     minHeight: '400px',
//                     textAlign: 'center',
//                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                     boxSizing: 'border-box',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <h3
//                     style={{
//                       fontSize: 'clamp(18px, 2.5vw, 22px)',
//                       fontFamily: 'Playfair, serif',
//                       color: '#333',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     {result.title}
//                   </h3>
//                   <p
//                     style={{
//                       fontSize: 'clamp(14px, 2vw, 16px)',
//                       color: '#555',
//                       marginTop: '10px',
//                       fontFamily: 'Arial, sans-serif',
//                     }}
//                   >
//                     {result.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Spinner CSS */}
//       <style>
//         {`
//           .spinner {
//             border: 8px solid #f3f3f3;
//             border-top: 8px solid #4e73df;
//             border-radius: 50%;
//             width: 50px;
//             height: 50px;
//             animation: spin 2s linear infinite;
//             margin: 0 auto 20px auto;
//           }

//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default SearchResultsPage;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const SearchResultsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get('query');

//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!searchQuery) return;

//     setLoading(true);
//     setTimeout(() => {
//       const fetchedResults = [
//         { id: 1, title: `Result for "${searchQuery}" 1`, description: 'Description for Result 1' },
//         { id: 2, title: `Result for "${searchQuery}" 2`, description: 'Description for Result 2' },
//         { id: 3, title: `Result for "${searchQuery}" 3`, description: 'Description for Result 3' },
//       ];
//       setResults(fetchedResults);
//       setLoading(false);
//     }, 1000);
//   }, [searchQuery]);

//   const handleNewSearch = () => {
//     // Clear the search query from the URL and navigate home
//     navigate('/');
//   };

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '100vh',
//         background: 'linear-gradient(to right, #4e73df, #1cc88a)',
//         padding: '20px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: '30px',
//         color: '#fff',
//       }}
//     >
//       <div
//         style={{
//           width: 1059,
//           height: 685,
//           position: 'relative',
//           background: '#F4F4F4',
//           borderRadius: '30px',
//           overflow: 'hidden',
//           padding: '30px',
//         }}
//       >
//         {loading ? (
//           <div
//             style={{
//               textAlign: 'center',
//               fontSize: '24px',
//               color: '#333',
//               fontWeight: 'bold',
//               marginTop: '50px',
//             }}
//           >
//             Loading...
//           </div>
//         ) : (
//           <>
//             <h2
//               style={{
//                 textAlign: 'center',
//                 fontSize: '32px',
//                 fontFamily: 'Playfair, serif',
//                 fontWeight: '400',
//                 marginBottom: '30px',
//                 color: '#333',
//               }}
//             >
//               Search Results for: <span style={{ color: '#4e73df' }}>{searchQuery}</span>
//             </h2>

//             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
//               {results.map((result) => (
//                 <div
//                   key={result.id}
//                   style={{
//                     background: '#D9D9D9',
//                     padding: '20px',
//                     borderRadius: '30px',
//                     margin: '10px',
//                     width: '250px',
//                     textAlign: 'center',
//                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                   }}
//                 >
//                   <h3
//                     style={{
//                       fontSize: '20px',
//                       fontFamily: 'Playfair, serif',
//                       color: '#333',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     {result.title}
//                   </h3>
//                   <p
//                     style={{
//                       fontSize: '16px',
//                       color: '#555',
//                       marginTop: '10px',
//                       fontFamily: 'Arial, sans-serif',
//                     }}
//                   >
//                     {result.description}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Buttons */}
//             <div style={{ textAlign: 'center', marginTop: '40px' }}>
//               <button
//                 onClick={() => navigate('/')}
//                 style={{
//                   backgroundColor: '#4e73df',
//                   color: '#fff',
//                   padding: '12px 24px',
//                   border: 'none',
//                   borderRadius: '30px',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   cursor: 'pointer',
//                   marginRight: '10px',
//                 }}
//               >
//                 Return to Home
//               </button>

//               <button
//                 onClick={handleNewSearch}
//                 style={{
//                   backgroundColor: '#1cc88a',
//                   color: '#fff',
//                   padding: '12px 24px',
//                   border: 'none',
//                   borderRadius: '30px',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   cursor: 'pointer',
//                 }}
//               >
//                 New Search
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResultsPage;



