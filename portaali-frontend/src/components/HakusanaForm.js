import React, { useState } from 'react';

const HakusanaForm = ({ lisaaHakusana }) => {
    const [value, setValue] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        lisaaHakusana(value)
        setValue('');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Kuvaus: <input
                    name='kuvaus'
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <button type='submit'>Lisää hakusana</button>
            </form>
        </div>
    );
}

export default HakusanaForm;