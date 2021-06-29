import React, { useState } from 'react';
import loginService from '../services/login';
import tuoteService from '../services/tuotteet';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [salasana, setSalasana] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                userName, salasana
            });
            setUser(user);
            tuoteService.lisaaToken(user.token);
            console.log('user ', user, ' logged in');
            setUserName('');
            setSalasana('');
        } catch (exception) {
            console.log('virheellinen kirjautuminen');
        }
    }

    return (
        <div>
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Käyttäjätunnus:
                    <input
                        type='text'
                        value={userName}
                        name="username"
                        onChange={({ target }) => setUserName(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={salasana}
                        name="password"
                        onChange={({ target }) => setSalasana(target.value)}
                    />
                </div>
                <button type="submit">Kirjaudu sisään</button>
            </form>
        </div>
    )
}
export default Login;