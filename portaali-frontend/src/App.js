import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

//Components
import Login from './components/Login';
import TuoteTiedot from './components/TuoteTiedot/TuoteTiedot';
import TuoteLista from './components/TuoteLista/TuoteLista';
import KategoriaForm from './components/Kategoriat/KategoriaForm';
import TuoteForm from './components/TuoteForm/TuoteForm';
import SideBar from './components/SideBar/SideBar';
import Backdrop from './components/SideBar/Backdrop';
import Navbar from './components/NavBar/Navbar';
import Ostoskori from './components/Ostoskori/Ostoskori';

//Services
import tuoteService from './services/tuotteet';

//Actions
import { alustaTuotteet } from './redux/actions/tuoteActions';

let kaikkiKategoriat = [];

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('alustetaan tuotelista');
    dispatch(alustaTuotteet())
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      tuoteService.lisaaToken(user.token);
    }
  }, []);

  return (
    <main>
      <div>
        <Navbar sidebarVisible={() => setSidebarVisible(true)} />
        <SideBar show={sidebarVisible} clickHandler={() => setSidebarVisible(false)} />
        <Backdrop show={sidebarVisible} clickHandler={() => setSidebarVisible(false)} />
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
        <Route path="/Ostoskori">
          <Ostoskori />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
