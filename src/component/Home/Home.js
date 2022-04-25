import React from "react";
import image from '../../image/paymentsbilling.gif'
const Home = () => {
    return( 
        <div className="container-fluid  home ">
        <div className="home_body" style={{backgroundImage:image}}>
            <img src={image} alt="img"/> 
        </div>
        </div>
    )
}

export default Home

//css of home component write in the app.css