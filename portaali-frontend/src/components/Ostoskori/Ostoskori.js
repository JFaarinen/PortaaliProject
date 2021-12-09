import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//Components
import TuoteKorissa from './TuoteKorissa';

//Actions
import { lisaaKoriin, poistaKorista, tyhjennaKori } from '../../redux/actions/koriActions';

const Ostoskori = () => {
    const dispatch = useDispatch();
    const kori = useSelector((state) => state.kori);
    const { tuotteetKorissa } = kori;

    return (
        <div className='koriNakyma'>
            <div className='korinakyma_vasen'>
                <h2>Valitut tuotteet</h2>
            </div>
        </div>
    )

}

export default Ostoskori;