import { Link } from 'react-router-dom';
import './TuoteKorissa.css';

const TuoteKorissa = ({ tuote, lkmMuutosHandler, poistoHandler }) => {
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
            <select className='tuote_lkmValinta' value={tuote.varausLkm} onChange={(e) =>lkmMuutosHandler(tuote.malliId, e.target.value)}>
                {[...Array(tuote.maxLkm).keys()].map(
                    (t) => <option key={t + 1} value={t + 1}>{t + 1}</option>
                )}
            </select>
            <button className='tuote_poistaBtn' onClick={() => poistoHandler(tuote.malliId)}>
                <i className='fas fa-trash'></i>
            </button>
        </div>
    );
}

export default TuoteKorissa;