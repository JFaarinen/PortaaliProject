import React, { useEffect, useState } from 'react';
import TuoteLista from './components/Tuotelista';
import Kategoriat from './components/Kategoriat';
import UusiTuote from './components/UusiTuote';
import tuoteService from './services/tuotteet';
import Login from './components/Login';
import Tuote from './components/Tuote';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

let kaikkiKategoriat = [];

const App = () => {
  const [tuotteet, setTuotteet] = useState([]);
  const [ostoskori, setOstoskori] = useState([]);
  const [kategoriat, setKategoriat] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    tuoteService
      .getAll()
      .then(response => {
        setTuotteet(response.data);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      tuoteService.lisaaToken(user.token);
    }
  }, []);

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
          <Kategoriat kategoriat={kategoriat} tuoteSuodatus={suodataTuotteet} />
          <TuoteLista tuotteet={tuotteet} />
        </Route>
        <Route path="/uusiTuote">
          <UusiTuote />
        </Route>
        <Route path="/Login">
          <Login setUser={() => setUser()}/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
