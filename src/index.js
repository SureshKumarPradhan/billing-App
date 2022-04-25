import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import configureStore from './store/configureStore';
import { isLogin,startUserInformation } from "./action/userAction";
import { startgetCustometdata } from "./action/customerAction";
import { startGetProductdata } from "./action/productAction";
import { startGetAllBills } from "./action/billAction";
const store = configureStore();
//console.log(store)

  if(localStorage.getItem('token')){
  store.dispatch(isLogin(true));
  store.dispatch(startUserInformation());
  store.dispatch(startgetCustometdata());
  store.dispatch(startGetProductdata())
  store.dispatch(startGetAllBills())
  }
ReactDOM.createRoot(document.getElementById('root'))
.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
  
