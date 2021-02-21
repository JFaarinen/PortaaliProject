import React, { useEffect, useState } from 'react';
import TuoteLista from './components/TuoteLista';
import Kategoriat from './components/Kategoriat';
import UusiTuote from './components/UusiTuote';
import tuoteService from './services/tuotteet';
import Tuote from './components/Tuote';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

function App() {
  const [tuotteet, setTuotteet] = useState([]);
  const [ostoskori, setOstoskori] = useState([]);
  //const [kategoriat, setKategoriat] = useState(kaikkiKategoriat);

  useEffect(() => {
    tuoteService
      .getAll()
      .then(response => {
        setTuotteet(response.data);
      });
  }, []);

  //const kaikkiKategoriat = ['Kaikki', ...new Set(tuotteet.map((tuote) => tuote.kategoriat).reduce((a, b) => a.concat(b)))];

  const match = useRouteMatch('/tuotteet/:id');
  const tuote = match
    ? tuotteet.find(tuote => tuote.id === Number(match.params.id))
    : null;

  const suodataTuotteet = (kategoria) => {
    if (kategoria === 'Kaikki') {
      setTuotteet(tuotteet);
    } else {
      const naytaTuotteet = tuotteet.filter((tuote) => tuote.kategoriat.includes(kategoria));
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
        <Link className="menu" to="/uusiTuote">Uusi tuote</Link>
      </div>
      <Switch>
        <Route path="/tuotteet/:id">
          <Tuote tuote={tuote} ostoskori={ostoskori} setOstoskori={() => setOstoskori()} />
        </Route>
        <Route path="/tuotteet">
          <TuoteLista tuotteet={tuotteet} />
        </Route>
        <Route path="/uusiTuote">
          <UusiTuote />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
