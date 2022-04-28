import React from "react";
import { useSelector } from "react-redux";
import './account.css';
import image from '../../image/kisspng-computer-icons-user-profile-person-5abd8530d0a352.2050393115223698408546.png'
const Account = (props) => {
    const userData = useSelector((state)=>{
        return state.user.userdata;
    })
    //console.log(userData)
    return(
        <div className=" container-fluid account-top">
        <div className="container   account">
             <div className="account_body">
                 <img src={image} alt="profile image"/>
                 <div className="account_details">
                     <h1>Name : {userData.username}</h1>
                     <h1>Business : {userData.businessName}</h1>
                     <h1>Address : {userData.address}</h1>
                 </div>
             </div>
        </div>
        </div>
    )
}

export default Account;