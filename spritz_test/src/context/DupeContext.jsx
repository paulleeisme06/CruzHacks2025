import React, { useState, createContext } from 'react';

const DupeContext = createContext();

export const DupeProvider = ({ children }) => {
  const [dupeResult, setDupeResult] = useState(null);
  const [apiFailed, setApiFailed] = useState(false);

  return (
    <DupeContext.Provider value={{ dupeResult, setDupeResult, apiFailed, setApiFailed }}>
      {children}
    </DupeContext.Provider>
  );
};

export default DupeContext;
