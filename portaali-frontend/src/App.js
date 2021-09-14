import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alustaTuotteet } from './reducers/tuoteReducer';
import TuoteLista from './components/TuoteLista/TuoteLista';
import KategoriaForm from './components/Kategoriat/KategoriaForm';
import TuoteForm from './components/TuoteForm/TuoteForm';
import TuoteRyhma from './components/Kategoriat/KategoriaForm';
import tuoteService from './services/tuotteet';
import Login from './components/Login';
import TuoteTiedot from './components/TuoteLista/TuoteTiedot/TuoteTiedot';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

let kaikkiKategoriat = [];

const App = () => {
  const [ostoskori, setOstoskori] = useState([]);
  const [kategoriat, setKategoriat] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('alustetaan tuotelista');
    dispatch(alustaTuotteet())
  }, [dispatch]);

  //const tuotteet = useSelector(state => state.tuotteet);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      tuoteService.lisaaToken(user.token);
    }
  }, []);

  /*
  const match = useRouteMatch('/tuotteet/:id');
  const tuote = match
    ? tuotteet.find(tuote => tuote.id === Number(match.params.id))
    : null;
    */

  /*
const suodataTuotteet = (kategoria) => {
  if (kategoria === 'Kaikki') {
    setTuotteet(tuotteet);
  } else {
    const naytaTuotteet = tuotteet.filter((tuote) => tuote.kategoriat.includes(kategoria));
    setTuotteet(naytaTuotteet);
  }
}
*/

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
        <Link className="menu" to="/uusiKategoria">Lisää tuoteryhmä</Link>
      </div>
      <Switch>
        <Route path="/tuotteet/:id">
          <TuoteTiedot />
        </Route>
        <Route path="/tuotteet">
          <TuoteLista />
        </Route>
        <Route path="/uusiTuote">
          <TuoteForm />
        </Route>
        <Route path="/uusiKategoria">
          <KategoriaForm />
        </Route>
        <Route path="/Login">
          <Login setUser={() => setUser()} />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
