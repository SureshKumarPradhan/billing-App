import React from "react";

const DashboardBox = (props) => {
  const { currentFiveData ,footer} = props;
  return (
    <>
      <div className="card_box pt-4">
        {currentFiveData.slice(0, 5).map((val) => {
          return <p key={val._id}>{val.name}</p>;
        })}
        <div className="footer">
          <p className="pt-2">{footer}</p>
        </div>
      </div>
    </>
  );
};
export default DashboardBox;
