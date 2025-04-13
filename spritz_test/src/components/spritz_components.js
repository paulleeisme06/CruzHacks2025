import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';

const SpritzComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if (showError) setShowError(false);
  };

  const handleSearchClick = () => {
    if (searchText.trim() === '') {
      setShowError(true);
      return;
    }
    navigate(`/searchResultsPage?query=${searchText}`);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log('User signed in:', result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Background image */}
      <img
        src="/spritzbackground.png"
        alt="Background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* Auth Buttons */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          zIndex: 10,
        }}
      >
        {!user ? (
          <button
            onClick={handleGoogleSignIn}
            style={{
              backgroundColor: '#9ACD32',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '30px',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              animation: 'logoAnimation 1.5s ease-out',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#75982D')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#9ACD32')}
          >
            Sign in with Google
          </button>
        ) : (
          <>
            <div style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>
              Welcome, {user.displayName}
            </div>
            <button
              onClick={handleSignOut}
              style={{
                backgroundColor: '#FF3B30',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </>
        )}
      </div>

      {/* Main content */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '-30vh',
          paddingBottom: '10vh',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <h1
          style={{
            fontFamily: 'Playfair',
            fontSize: 'clamp(48px, 10vw, 128px)',
            fontWeight: 700,
            margin: 0,
            animation: 'logoAnimation 1.5s ease-out',
          }}
        >
          spritz
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Playfair',
            fontSize: 'clamp(18px, 3vw, 36px)',
            fontWeight: 400,
            marginTop: '1rem',
            animation: 'logoAnimation 1.5s ease-out',
          }}
        >
          Discover affordable luxury.
        </p>

        {/* Search bar */}
        <div
          style={{
            marginTop: '2rem',
            width: 'min(90%, 600px)',
            height: '74px',
            display: 'flex',
            borderRadius: '37px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            animation: 'logoAnimation 1.5s ease-out',
            backgroundColor: '#fff',
          }}
        >
          <input
            type="text"
            style={{
              flexGrow: 1,
              height: '100%',
              padding: '0 20px',
              border: 'none',
              outline: 'none',
              fontSize: '18px',
              fontFamily: 'Roboto',
              borderRadius: '37px 0 0 37px',
            }}
            placeholder="Paste URL or Search"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchClick();
            }}
          />
          <button
            style={{
              width: '160px',
              height: '100%',
              backgroundColor: '#9ACD32',
              border: 'none',
              color: '#fff',
              fontFamily: 'Roboto',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onClick={handleSearchClick}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#75982D')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#9ACD32')}
          >
            Search
          </button>
        </div>

        {/* Error message */}
        {showError && (
          <div
            style={{
              marginTop: '1rem',
              color: '#ff4d4f',
              background: '#fff3f3',
              padding: '8px 16px',
              borderRadius: '20px',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: '500',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              animation: 'fadeIn 0.5s ease-in-out',
            }}
          >
            Please enter something to search!
          </div>
        )}
      </div>

      {/* Keyframe animations */}
      <style>
        {`
          @keyframes logoAnimation {
            0% {
              opacity: 0;
              transform: translateY(-50px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SpritzComponent;

// // src/components/spritz_components.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, provider } from '../firebase-config';
// import { signInWithPopup, signOut } from 'firebase/auth';

// const SpritzComponent = () => {
//   const [searchText, setSearchText] = useState('');
//   const [user, setUser] = useState(null);
//   const [showError, setShowError] = useState(false);
//   const navigate = useNavigate();

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//     if (showError) setShowError(false); // Clear error on typing
//   };

//   const handleSearchClick = () => {
//     if (searchText.trim() === '') {
//       setShowError(true);
//       return;
//     }
//     navigate(`/searchResultsPage?query=${searchText}`);
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       setUser(result.user);
//       console.log('User signed in:', result.user);
//     } catch (error) {
//       console.error('Error signing in with Google:', error.message);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       console.log('User signed out');
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//     }
//   };

//   return (
//     <div
//       style={{
//         width: 1512,
//         height: 982,
//         position: 'relative',
//         background: 'linear-gradient(45deg, #748469, #ABB290, #AAC1B1, #F9EAD7, #F6F6EE)',
//         overflow: 'hidden',
//         fontFamily: 'Playfair, serif',
//       }}
//     >
//       <img
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'absolute',
//           objectFit: 'cover',
//           zIndex: -1,
//         }}
//         src="https://placehold.co/1871x1307"
//         alt="Background"
//       />

//       {/* Logo */}
//       <div
//         style={{
//           left: 596,
//           top: 196,
//           position: 'absolute',
//           textAlign: 'center',
//           color: 'black',
//           fontSize: 128,
//           fontWeight: '700',
//           wordWrap: 'break-word',
//           animation: 'logoAnimation 1.5s ease-out', // Apply animation for logo
//         }}
//       >
//         spritz
//       </div>

//       {/* Subtitle */}
//       <div
//         style={{
//           width: 462,
//           height: 43,
//           left: 526,
//           top: 350,
//           position: 'absolute',
//           textAlign: 'center',
//           color: 'black',
//           fontSize: 36,
//           fontWeight: '400',
//           wordWrap: 'break-word',
//         }}
//       >
//         Discover affordable luxury.
//       </div>

//       {/* Search bar */}
//       <div
//         style={{
//           width: 527,
//           height: 74,
//           left: 492,
//           top: 427,
//           position: 'absolute',
//           display: 'flex',
//           borderRadius: '37px',
//           boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//           overflow: 'hidden',
//         }}
//       >
//         <input
//           type="text"
//           style={{
//             flexGrow: 1,
//             height: '100%',
//             padding: '0 20px',
//             border: 'none',
//             outline: 'none',
//             fontSize: '18px',
//             fontFamily: 'Arial, sans-serif',
//           }}
//           placeholder="Paste URL or Search"
//           value={searchText}
//           onChange={handleSearchChange}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') handleSearchClick();
//           }}
//         />
//         <button
//           style={{
//             width: '160px',
//             height: '100%',
//             backgroundColor: '#4e73df',
//             border: 'none',
//             color: '#fff',
//             fontSize: '18px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//             transition: 'background-color 0.3s',
//           }}
//           onClick={handleSearchClick}
//           onMouseEnter={(e) => (e.target.style.backgroundColor = '#375abe')}
//           onMouseLeave={(e) => (e.target.style.backgroundColor = '#4e73df')}
//         >
//           Search
//         </button>
//       </div>

//       {/* Error Message */}
//       {showError && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 515,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             color: '#ff4d4f',
//             background: '#fff3f3',
//             padding: '8px 16px',
//             borderRadius: '20px',
//             fontSize: '16px',
//             fontWeight: '500',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//             animation: 'fadeIn 0.5s ease-in-out', // Keep the message centered with fade-in
//           }}
//         >
//           Please enter something to search!
//         </div>
//       )}

//       {/* Auth buttons */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 40,
//           right: 40,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'flex-end',
//         }}
//       >
//         {!user ? (
//           <button
//             onClick={handleGoogleSignIn}
//             style={{
//               backgroundColor: '#4285F4',
//               color: 'white',
//               border: 'none',
//               padding: '10px 20px',
//               borderRadius: '30px',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//             }}
//           >
//             Sign in with Google
//           </button>
//         ) : (
//           <>
//             <div style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>
//               Welcome, {user.displayName}
//             </div>
//             <button
//               onClick={handleSignOut}
//               style={{
//                 backgroundColor: '#FF3B30',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '30px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//               }}
//             >
//               Sign Out
//             </button>
//           </>
//         )}
//       </div>

//       {/* Add CSS for logo animation and fade-in */}
//       <style>
//         {`
//           @keyframes logoAnimation {
//             0% {
//               opacity: 0;
//               transform: translateY(-100px);
//             }
//             100% {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @keyframes fadeIn {
//             0% {
//               opacity: 0;
//             }
//             100% {
//               opacity: 1;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default SpritzComponent;



// // src/components/spritz_components.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, provider } from '../firebase-config';
// import { signInWithPopup, signOut } from 'firebase/auth';

// const SpritzComponent = () => {
//   const [searchText, setSearchText] = useState('');
//   const [user, setUser] = useState(null);
//   const [showError, setShowError] = useState(false);
//   const navigate = useNavigate();

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//     if (showError) setShowError(false); // Clear error on typing
//   };

//   const handleSearchClick = () => {
//     if (searchText.trim() === '') {
//       setShowError(true);
//       return;
//     }
//     navigate(`/searchResultsPage?query=${searchText}`);
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       setUser(result.user);
//       console.log('User signed in:', result.user);
//     } catch (error) {
//       console.error('Error signing in with Google:', error.message);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       console.log('User signed out');
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//     }
//   };

//   return (
//     <div
//       style={{
//         width: 1512,
//         height: 982,
//         position: 'relative',
//         background: 'linear-gradient(45deg, #748469, #ABB290, #AAC1B1, #F9EAD7, #F6F6EE)',
//         overflow: 'hidden',
//         fontFamily: 'Playfair, serif',
//       }}
//     >
//       <img
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'absolute',
//           objectFit: 'cover',
//           zIndex: -1,
//         }}
//         src="https://placehold.co/1871x1307"
//         alt="Background"
//       />

//       {/* Logo */}
//       <div
//         style={{
//           left: 596,
//           top: 196,
//           position: 'absolute',
//           textAlign: 'center',
//           color: 'black',
//           fontSize: 128,
//           fontWeight: '700',
//           wordWrap: 'break-word',
//         }}
//       >
//         spritz
//       </div>

//       {/* Subtitle */}
//       <div
//         style={{
//           width: 462,
//           height: 43,
//           left: 526,
//           top: 350,
//           position: 'absolute',
//           textAlign: 'center',
//           color: 'black',
//           fontSize: 36,
//           fontWeight: '400',
//           wordWrap: 'break-word',
//         }}
//       >
//         Discover affordable luxury.
//       </div>

//       {/* Search bar */}
//       <div
//         style={{
//           width: 527,
//           height: 74,
//           left: 492,
//           top: 427,
//           position: 'absolute',
//           display: 'flex',
//           borderRadius: '37px',
//           boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//           overflow: 'hidden',
//         }}
//       >
//         <input
//           type="text"
//           style={{
//             flexGrow: 1,
//             height: '100%',
//             padding: '0 20px',
//             border: 'none',
//             outline: 'none',
//             fontSize: '18px',
//             fontFamily: 'Arial, sans-serif',
//           }}
//           placeholder="Paste URL or Search"
//           value={searchText}
//           onChange={handleSearchChange}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') handleSearchClick();
//           }}
//         />
//         <button
//           style={{
//             width: '160px',
//             height: '100%',
//             backgroundColor: '#4e73df',
//             border: 'none',
//             color: '#fff',
//             fontSize: '18px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//             transition: 'background-color 0.3s',
//           }}
//           onClick={handleSearchClick}
//           onMouseEnter={(e) => (e.target.style.backgroundColor = '#375abe')}
//           onMouseLeave={(e) => (e.target.style.backgroundColor = '#4e73df')}
//         >
//           Search
//         </button>
//       </div>

//       {/* Error Message */}
//       {showError && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 515,
//             left: '50%',
//             transform: 'translateX(-50%)',
//             color: '#ff4d4f',
//             background: '#fff3f3',
//             padding: '8px 16px',
//             borderRadius: '20px',
//             fontSize: '16px',
//             fontWeight: '500',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//             animation: 'fadeIn 0.5s ease-in-out',
//           }}
//         >
//           Please enter something to search!
//         </div>
//       )}

//       {/* Auth buttons */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 40,
//           right: 40,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'flex-end',
//         }}
//       >
//         {!user ? (
//           <button
//             onClick={handleGoogleSignIn}
//             style={{
//               backgroundColor: '#4285F4',
//               color: 'white',
//               border: 'none',
//               padding: '10px 20px',
//               borderRadius: '30px',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//             }}
//           >
//             Sign in with Google
//           </button>
//         ) : (
//           <>
//             <div style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>
//               Welcome, {user.displayName}
//             </div>
//             <button
//               onClick={handleSignOut}
//               style={{
//                 backgroundColor: '#FF3B30',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '30px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//               }}
//             >
//               Sign Out
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpritzComponent;


// // src/components/spritz_components.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, provider } from '../firebase-config';
// import { signInWithPopup, signOut } from 'firebase/auth';

// const SpritzComponent = () => {
//   const [searchText, setSearchText] = useState('');
//   const [user, setUser] = useState(null);
//   const [animateLogo, setAnimateLogo] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setAnimateLogo(true);
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   const handleSearch = () => {
//     if (searchText.trim() === '') {
//       alert('Please enter a search query.');
//     } else {
//       navigate(`/searchResultsPage?query=${searchText}`);
//       setSearchText('');
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       setUser(result.user);
//       console.log('User signed in:', result.user);
//     } catch (error) {
//       console.error('Error signing in with Google:', error.message);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       console.log('User signed out');
//     } catch (error) {
//       console.error('Error signing out:', error.message);
//     }
//   };

//   return (
//     <div
//       style={{
//         width: 1512,
//         height: 982,
//         position: 'relative',
//         background: 'linear-gradient(45deg, #748469, #ABB290, #AAC1B1, #F9EAD7, #F6F6EE)',
//         overflow: 'hidden',
//       }}
//     >
//       <img
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'absolute',
//           objectFit: 'cover',
//           zIndex: -1,
//         }}
//         src="https://placehold.co/1871x1307"
//         alt="Background"
//       />

//       {/* Logo */}
//       <div
//         style={{
//           left: 596,
//           top: 196,
//           position: 'absolute',
//           textAlign: 'center',
//           color: 'black',
//           fontSize: 128,
//           fontFamily: 'Playfair',
//           fontWeight: '700',
//           wordWrap: 'break-word',
//           transform: animateLogo ? 'scale(1)' : 'scale(0.8)',
//           transition: 'transform 0.6s ease-in-out',
//         }}
//       >
//         spritz
//       </div>

//       {/* Subtitle */}
//       <div
//         style={{
//           width: 462,
//           height: 43,
//           left: 526,
//           top: 350,
//           position: 'absolute',
//           textAlign: 'center',
//           color: 'black',
//           fontSize: 36,
//           fontFamily: 'Playfair',
//           fontWeight: '400',
//           wordWrap: 'break-word',
//         }}
//       >
//         Discover affordable luxury.
//       </div>

//       {/* Search bar and button */}
//       <div
//         style={{
//           width: 527,
//           height: 74,
//           left: 492,
//           top: 427,
//           position: 'absolute',
//           background: '#F4F4F4',
//           borderRadius: 30,
//           display: 'flex',
//           alignItems: 'center',
//         }}
//       >
//         <input
//           type="text"
//           style={{
//             flexGrow: 1,
//             height: '100%',
//             padding: '10px',
//             border: 'none',
//             borderRadius: '30px',
//             fontSize: '18px',
//           }}
//           placeholder="Paste URL or Search"
//           value={searchText}
//           onChange={handleSearchChange}
//           onKeyDown={handleKeyPress}
//         />
//         <button
//           style={{
//             width: '20%',
//             height: '100%',
//             backgroundColor: '#B7F0FF',
//             border: 'none',
//             borderRadius: '30px',
//             fontSize: '18px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//             color: 'white',
//             transition: 'background-color 0.3s',
//           }}
//           onClick={handleSearch}
//           onMouseEnter={(e) => (e.target.style.backgroundColor = '#80D8FF')}
//           onMouseLeave={(e) => (e.target.style.backgroundColor = '#B7F0FF')}
//         >
//           Search
//         </button>
//       </div>

//       {/* Auth buttons and welcome */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 40,
//           right: 40,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'flex-end',
//         }}
//       >
//         {!user ? (
//           <button
//             onClick={handleGoogleSignIn}
//             style={{
//               backgroundColor: '#4285F4',
//               color: 'white',
//               border: 'none',
//               padding: '10px 20px',
//               borderRadius: '30px',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//             }}
//           >
//             Sign in with Google
//           </button>
//         ) : (
//           <>
//             <div style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>
//               Welcome, {user.displayName}
//             </div>
//             <button
//               onClick={handleSignOut}
//               style={{
//                 backgroundColor: '#FF3B30',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 20px',
//                 borderRadius: '30px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//               }}
//             >
//               Sign Out
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpritzComponent;