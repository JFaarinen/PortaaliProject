import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//Reducerit
import { tuoteReducer } from './redux/reducers/tuoteReducer';
import { kuvaReducer } from './redux/reducers/kuvaReducer';
import { koriReducer } from './redux/reducers/koriReducers';

const reducer = combineReducers({
    tuotteet: tuoteReducer,
    kuvat: kuvaReducer,
    kori: koriReducer
});

const koriLocalStoragessa = localStorage.getItem('kori') ? JSON.parse(localStorage.getItem('kori')) : [];

const ALKUTILANNE = {
    kori: {
        tuotteetKorissa:  koriLocalStoragessa
    }
};

const store = createStore(
    reducer,
    ALKUTILANNE,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store;