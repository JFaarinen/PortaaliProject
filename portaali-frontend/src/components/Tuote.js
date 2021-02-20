import React from 'react';

const Tuote = ({ tuote, ostoskori, setOstoskori }) => {
    const { nimi, img, lkm, hinta, kuvaus } = tuote;

    const lisaaKoriin = (event) => {
        event.preventDefault();
        const kpl = event.target.kpl.value;
        event.target.kpl.value = '';
        const varaus = {
            tuote: nimi,
            hinta: hinta,
            lkm: kpl
        }
        const koriUpd = ostoskori.concat(varaus);
        console.log(koriUpd);
        setOstoskori(koriUpd);
        console.log(ostoskori);
    }

    return (
        <div className='section-center'>
            <div className='tuote'>
                <h2 className='otsikko'>{nimi}</h2>
                <img src={`./.${img}`} alt={nimi} className='kuva' />
                <div className='tiedot'>
                    <p>Määrä: {lkm} kpl</p>
                    <p>Hinta: {hinta}€</p>
                </div>
                <div className='kuvaus'>
                    <p>{kuvaus}</p>
                </div>
                <form onSubmit={lisaaKoriin}>
                    <input name='kpl' />
                    <button type='submit'>Lisää koriin</button>
                </form>
            </div>


        </div>
    )

}

export default Tuote;