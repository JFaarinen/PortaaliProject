import React, { useState } from 'react';
import Menu from './components/Menu';
import Kategoriat from './components/Kategoriat';
import tuotteet from './tuotteet';

const kategoriat = new Set(tuotteet.map((tuote) => tuote.kategoriat).reduce((a, b) => a.concat(b)));

function App() {
  console.log(kategoriat);

  return (
    <div className="App">
      <h2>Tarvikevarasto Portaali</h2>

    </div>
  );
}

export default App;
