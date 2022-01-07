import { Link } from 'react-router-dom';
import './TuoteKorissa.css';

const TuoteKorissa = ({ tuote, muutaLkmHandler, poistaTuoteHandler }) => {
    console.log(tuote);

    return (
        <div className='tuoteKorissa'>
            <div className='tuote_img'>
                <img src={''} alt={tuote} />
            </div>
            <Link to={`/tuotteet/${tuote.id}`} className='tuote_linkki'>
                <p>{tuote.tuotenimi}</p>
            </Link>
            <p className='tuote_hinta'>{tuote.kplHinta}€</p>
            <select className='tuote_lkmValinta' value={tuote.varausLkm} onChange={(e) =>muutaLkmHandler()}>

            </select>
            <button className='tuote_poistaBtn' onClick={() => poistaTuoteHandler(tuote.id)}>
                <i className='fas fa-trash'></i>
            </button>
        </div>
    );
}

export default TuoteKorissa;