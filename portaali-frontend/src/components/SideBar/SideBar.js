import './SideBar.css';
import { Link } from 'react-router-dom';

const SideBar = ({ show, clickHandler }) => {

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
                    <Link className="menu_link" to="/larpit">Pelejä</Link>
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
                            Valitut tuotteet <span className="cartlogo_badge">0</span>
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    )

};

export default SideBar;