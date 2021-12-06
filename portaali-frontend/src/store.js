import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { tuoteReducer } from './redux/reducers/tuoteReducer';
import { kuvaReducer } from './redux/reducers/kuvaReducer';
import { koriReducer } from "./redux/reducers/koriReducers";

const reducer = combineReducers({
    tuotteet: tuoteReducer,
    kuvat: kuvaReducer,
    kori: koriReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store;