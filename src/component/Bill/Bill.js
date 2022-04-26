import React, { useState } from "react";
import BillForm from "./BillForm";
import "./bill.css";
import { useDispatch } from "react-redux";
import BillTable from "./BillTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startDeleteBill } from "../../action/billAction";

const Bill = (props) => {
  const dispatch = useDispatch();

  const [formToggle, setFormToggle] = useState(false);

  //   dispatch(startDeleteCusto
  const handelFormToggle = () => {
    setFormToggle(!formToggle);
  };

  const handeldelete = (id) => {
    const isDelete = window.confirm("are you sure....");
    if (isDelete) {
      dispatch(startDeleteBill(id));
    }
  };
  return (
    <>
      <div className="bills">
        <div className="mb-5">
          {formToggle ? <BillForm handelFormToggle={handelFormToggle} /> : null}
        </div>
        <div
        className={`text-center icon ${formToggle && "iconMinus"}`}
        onClick={handelFormToggle}
      >
        {!formToggle ? (
          <FontAwesomeIcon icon="fa-plus" className="faplus" />
        ) : (
          <FontAwesomeIcon icon="fa-minus" className="faplus" />
        )}
      </div>
        <BillTable handeldelete={handeldelete} />
      </div>
    </>
  );
};

export default Bill;
