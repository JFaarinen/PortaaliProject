import './SideBar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBar = ({ show, clickHandler }) => {

    const kori = useSelector(state => state.kori);
    const { tuotteetKorissa } = kori;

    const getKorinLkm = () => {
        return tuotteetKorissa.reduce((lkm, tuote) => lkm + Number(tuote.varausLkm), 0);
    }

    const sideDrawerClass = ['sideBar'];
    if (show) {
        sideDrawerClass.push('show');
    }

    return (
        <div className={sideDrawerClass.join(" ")}>
            <ul className='sideBar_linkit' onClick={clickHandler}>
                <li>
                    <Link className="menu_link" to="/">Alku</Link>
                </li>
                <li>
                    <Link className="menu_link" to="/tuotteet">Tuotteet</Link>
                </li>
                <li>
                    <Link className="menu_link" to="/larpit">Menneitä pelejä</Link>
                </li>
                <li>
                    <Link className="menu_link" to="/uusiTuote">Uusi tuote</Link>
                </li>
                <li>
                    <Link className="menu_link" to="/uusiKategoria">Lisää tuoteryhmä</Link>
                </li>
                <li>
                    <Link to="/ostoskori" className="menu_link">
                        <i className="fas fa-shopping-cart"></i>
                        <span>
                            Ostoskori: <span className="kori_lkmInfo">{getKorinLkm()}</span>
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    )

};

export default SideBar;