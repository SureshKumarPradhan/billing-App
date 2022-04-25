import React from "react";

const DashboardCard = (props) => {
  const { fastValue, secondValue,order } = props;
  return(
      
    <div className={`card row w-25 mt-5 order-${order}`} >
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
