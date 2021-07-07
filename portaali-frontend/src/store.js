import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import tuoteReducer from './reducers/tuoteReducer';

const store = createStore(
    tuoteReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store;