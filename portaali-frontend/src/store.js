import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import tuoteReducer from './reducers/tuoteReducer';
import kuvaReducer from './reducers/kuvaReducer';

const reducer = combineReducers({
    tuotteet: tuoteReducer,
    kuvat: kuvaReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store;