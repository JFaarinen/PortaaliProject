import React, { useState } from 'react';
import loginService from '../services/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password
            });
            setUser(user);
            setUsername('');
            setPassword('');
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
                        value={username}
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Kirjaudu sisään</button>
            </form>
        </div>
    )
}
export default Login;