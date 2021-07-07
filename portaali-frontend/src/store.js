import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import tuoteReducer, { alustaTuotteet } from './reducers/tuoteReducer';
import tuoteService from './services/tuotteet';

const store = createStore(
    tuoteReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

tuoteService.getAll()
    .then(tuotteet => store.dispatch(alustaTuotteet(tuotteet))
    );

export default store;