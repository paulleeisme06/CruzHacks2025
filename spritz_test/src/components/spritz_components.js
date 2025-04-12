import React, { useState } from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';

const SpritzComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Searching for:', searchText);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log('User signed in:', result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User signed out');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div
      style={{
        width: 1512,
        height: 982,
        position: 'relative',
        background: 'linear-gradient(45deg, #748469, #ABB290, #AAC1B1, #F9EAD7, #F6F6EE)',
        overflow: 'hidden',
      }}
    >
      <img
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          objectFit: 'cover',
          zIndex: -1,
        }}
        src="https://placehold.co/1871x1307"
        alt="Background"
      />

      {/* Logo */}
      <div
        style={{
          left: 596,
          top: 196,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 128,
          fontFamily: 'Playfair',
          fontWeight: '700',
          wordWrap: 'break-word',
        }}
      >
        spritz
      </div>

      {/* Subtitle */}
      <div
        style={{
          width: 462,
          height: 43,
          left: 526,
          top: 350,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 36,
          fontFamily: 'Playfair',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}
      >
        Discover affordable luxury.
      </div>

      {/* Search bar and button */}
      <div
        style={{
          width: 527,
          height: 74,
          left: 492,
          top: 427,
          position: 'absolute',
          background: '#F4F4F4',
          borderRadius: 30,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          style={{
            flexGrow: 1,
            height: '100%',
            padding: '10px',
            border: 'none',
            borderRadius: '30px',
            fontSize: '18px',
          }}
          placeholder="Paste URL or Search"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button
          style={{
            width: '20%',
            height: '100%',
            backgroundColor: '#B7F0FF',
            border: 'none',
            borderRadius: '30px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'white',
            transition: 'background-color 0.3s',
          }}
          onClick={handleSearchClick}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#80D8FF'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#B7F0FF'}
        >
          Search
        </button>
      </div>

      {/* Auth buttons and welcome */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {!user ? (
          <button
            onClick={handleGoogleSignIn}
            style={{
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
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
    </div>
  );
};

export default SpritzComponent;
