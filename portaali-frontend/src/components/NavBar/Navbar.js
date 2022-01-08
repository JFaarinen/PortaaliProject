import "./Navbar.css"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar = ({ sidebarVisible }) => {

    const kori = useSelector(state => state.kori);
    const { tuotteetKorissa } = kori;

    const getKorinLkm = () => {
        return tuotteetKorissa.reduce((lkm, tuote) => lkm + Number(tuote.varausLkm), 0);
    }

    return (
        <nav className="navbar">
            <div className="navbar_logo">
                <h2>LARP-tarvikevarasto</h2>
                <h3>PORTAALI</h3>
            </div>
            <div className="navbar_sisalto">

                <ul className="navbar_linkit">
                    <li>
                        <Link className="menu_link" to="/">Alku</Link>
                    </li>
                    <li>
                        <Link className="menu_link" to="/tuotteet">Tuotteet</Link>
                    </li>
                    <li>
                        <Link className="menu_link" to="/larpit">Pelejä</Link>
                    </li>
                    <li>
                        <Link className="menu_link" to="/uusiTuote">Uusi tuote</Link>
                    </li>
                    <li>
                        <Link className="menu_link" to="/uusiKategoria">Lisää tuoteryhmä</Link>
                    </li>
                    <li>
                        <Link to="/ostoskori" className="kori_link">
                            <i className="fas fa-shopping-cart"></i>
                            <span>
                                Ostoskori <span className="kori_lkmInfo">{getKorinLkm()}</span>
                            </span>
                        </Link>
                    </li>
                </ul>

                <div className='hamburger_menu' onClick={sidebarVisible}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;