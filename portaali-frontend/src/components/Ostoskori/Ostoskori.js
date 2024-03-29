import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Ostoskori.css';

//Components
import TuoteKorissa from './TuoteKorissa';

//Actions
import { poistaKorista, tyhjennaKori, muutaVarausta } from '../../redux/actions/koriActions';

const Ostoskori = () => {
    const dispatch = useDispatch();
    const kori = useSelector((state) => state.kori);
    const { tuotteetKorissa } = kori;
    console.log('tuotteet korissa: ', tuotteetKorissa);

    const lkmMuutosHandler = (id, lkm) => {
        dispatch(muutaVarausta(id, lkm));
    };

    const poistoHandler = (id) => {
        dispatch(poistaKorista(id));
    };

    const tyhjennysHandler = () => {
        if (window.confirm("Tyhjennetäänkö ostoskori?")) {
            dispatch(tyhjennaKori());
        }
    };

    const lkmYht = () => {
        return tuotteetKorissa.reduce((lkm, tuote) => Number(tuote.varausLkm) + lkm, 0);
    };

    const hintaYht = () => {
        return tuotteetKorissa.reduce((hinta, tuote) => (tuote.kplHinta * tuote.varausLkm) + hinta, 0);
    };

    return (
        <div className='koriNakyma'>
            <div className='korinakyma_vasen'>
                <h2>Valitut tuotteet</h2>
                {
                    tuotteetKorissa.length === 0 
                    ? (<div>
                        Ei valittuja tuotteita. <Link to='/'>Takaisin</Link>
                        </div>)
                    : (tuotteetKorissa.map((tuote) => (
                        <TuoteKorissa 
                        key={tuote.malliId}
                        tuote={tuote}
                        lkmMuutosHandler={lkmMuutosHandler}
                        poistoHandler={poistoHandler}
                        />
                    )))}
            </div>
            <div className='korinakyma_oikea'>
                <div className='kori_info'>
                    <p>Yhteensä: {lkmYht()} tuotetta</p>
                    <p>Hinta: {hintaYht().toFixed(2)}€</p>
                    <button onClick={tyhjennysHandler}>Tyhjennä kori</button>
                </div>
            </div>
            
        </div>
    );
};

export default Ostoskori;