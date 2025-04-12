// App.js or wherever you're defining your routes
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpritzComponent from './components/spritz_components';
import SearchResultsPage from './components/SearchResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpritzComponent />} />
        <Route path="/searchResultsPage" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
