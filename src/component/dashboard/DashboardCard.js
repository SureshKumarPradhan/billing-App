import React from "react";
import './dashboard.css'
const DashboardCard = (props) => {
  const { fastValue, secondValue,order } = props;
  return(
      
    <div className={`card row mt-5 order-${order}`} >
      <div className="col-12 h-50  card_upperbody">
        <p className="mt-2">{fastValue}</p>
      </div>
      <div className="col-12 h-50 card_lowerbody">
        <p className="mt-2">{secondValue}</p>
      </div>
    </div>
      
  )
}
export default DashboardCard;
