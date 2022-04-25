import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReduers from './../reducers/userReducers';
import customerReducer from "../reducers/customerReducers";
import productReducers from "../reducers/productReducer";
import billReducers from "../reducers/billReducers";
const configureStore = () => {
    const store = createStore(combineReducers(
        {
           user:userReduers,
           customers:customerReducer,
           product:productReducers,
           bills: billReducers
        }
    ),applyMiddleware(thunk))
    return store;
}

export default configureStore;