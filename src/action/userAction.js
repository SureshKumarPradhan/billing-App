import axios from "axios";
//import { startgetCustometdata } from "./customerAction";
export const startLogin = (formdata, toHomePage) => {
  return (dispatch) => {
    axios
      .post(`https://dct-billing-app.herokuapp.com/api/users/login`, formdata)
      .then((res) => {
        if (res.data.errors) {
          dispatch(loginError(res.data.errors));
        } else if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          toHomePage();
          dispatch(loginError(""));
          dispatch(isLogin(true));
          dispatch(startUserInformation())
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const startUserInformation = () => {
  return (dispatch) => {
    axios
      .get(`https://dct-billing-app.herokuapp.com/api/users/account`, {
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const result = res.data;
        //console.log(result)
        dispatch(useValue(result))
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const isLogin = (data) => {
  return {
    type: "IS_LOGIN",
    payload: data,
  };
};
const useValue = (data) => {
  return {
    type: "USER_DATA",
    payload: data,
  };
};
const loginError = (data) => {
  return {
    type: "LOGIN_ERROR",
    payload: data,
  };
};
