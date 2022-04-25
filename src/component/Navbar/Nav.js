import React, { useState } from "react";
import Home from "../Home/Home";
import Register from "../register/Register";
import Login from "../login/Login";
import Account from "../Account/account";
import Customers from "../customears/Customer";
import Product from '../products/Product';
import Bill from "../Bill/Bill";
import Dashboard from "../dashboard/Dashboard";
import { Link, Route, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "../privateRoute/privateRoute";
import { isLogin } from "../../action/userAction";
import ShowBill from './../Bill/Showbill';
const Nav = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [classlist, setclasslist] = useState(false);
  const myFunction = () => {
    setclasslist(!classlist);
  };
  const isLogedin = useSelector((state) => {
    return state.user.user_Login;
  });
  //console.log(isLogin)
  const handelLogout = () => {
    const confirmLogout = window.confirm("Are you sure..");
    if (confirmLogout) {
      history.push("/");
      localStorage.removeItem("token");
      dispatch(isLogin(false));
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-md  bg-light">
        <Link className="brand navbar-brand w-30" to="/">
          Billing App
        </Link>
        <button
          id="menu"
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={myFunction}
        >
          <div className={classlist ? "change container" : "container"}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav_ul navbar-nav  text-justify d-flex justify-content-around w-100 mr-5 ">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            {isLogedin ? (
              <>
              <li className="nav-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/account">Account</Link>
                </li>
                <li className="nav-item">
                  <Link to="/customers">Customer's</Link>
                </li>
                <li className="nav-item">
                  <Link to="/product">Product's</Link>
                </li>
                <li className="nav-item">
                  <Link to="/bill">Bill</Link>
                </li>
              
                <li className="nav-item">
                  <Link to="/" onClick={handelLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Route path="/" component={Home} exact={true}></Route>
      <Route path="/register" component={Register} exact={true}></Route>
      <Route path="/login" component={Login} exact={true}></Route>
      <Route path="/bills/:id" component={ShowBill} exact={true}></Route>
      {/* handell error page */}
      {/* <Redirect to='/register'/>*/}
      <PrivateRoute
        path="/dashboard"
        component={Dashboard}
        exact={true}
      ></PrivateRoute>
      <PrivateRoute
        path="/account"
        component={Account}
        exact={true}
      ></PrivateRoute>
      <PrivateRoute
        path="/customers"
        component={Customers}
        exact={true}
      ></PrivateRoute>
       <PrivateRoute
        path="/product"
        component={Product}
        exact={true}
      ></PrivateRoute>
       <PrivateRoute
        path="/bill"
        component={Bill}
        exact={true}
      ></PrivateRoute>
          
    </>
  );
};

export default Nav;
//css part of this component write on 