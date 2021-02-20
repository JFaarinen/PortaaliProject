import React, { useState } from 'react';
import TuoteLista from './components/TuoteLista';
import Kategoriat from './components/Kategoriat';
import tuoteLista from './tuotteet';
import Tuote from './components/Tuote';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

const kaikkiKategoriat = ['Kaikki', ...new Set(tuoteLista.map((tuote) => tuote.kategoriat).reduce((a, b) => a.concat(b)))];

function App() {
  const [tuotteet, setTuotteet] = useState(tuoteLista);
  const [kategoriat, setKategoriat] = useState(kaikkiKategoriat);
  const [ostoskori, setOstoskori] = useState([]);

  const match = useRouteMatch('/tuotteet/:id');
  const tuote = match
    ? tuotteet.find(tuote => tuote.id === Number(match.params.id))
    : null;

  const suodataTuotteet = (kategoria) => {
    if (kategoria === 'Kaikki') {
      setTuotteet(tuoteLista);
    } else {
      const naytaTuotteet = tuoteLista.filter((tuote) => tuote.kategoriat.includes(kategoria));
      setTuotteet(naytaTuotteet);
    }
  }

  return (
    <main>
      <div className="menu section">
        <div className="otsikko">
          <h1>Tarvikevarasto Portaali</h1>
          <div className="underline"></div>
        </div>
      </div>
      <div>
        <Link className="menu" to="/">Alku</Link>
        <Link className="menu" to="/tuotteet">Tuotteet</Link>
        <Link className="menu" to="/larpit">Pelejä</Link>
      </div>
      <Switch>
        <Route path="/tuotteet/:id">
          <Tuote tuote={tuote} ostoskori={ostoskori} setOstoskori={() => setOstoskori()} />
        </Route>
        <Route path="/tuotteet">
          <Kategoriat kategoriat={kategoriat} tuoteSuodatus={suodataTuotteet} />
          <TuoteLista tuotteet={tuotteet} />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
