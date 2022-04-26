import React, { useState } from "react";
import Customersform from "./CustomersForm";
import { useDispatch } from "react-redux";
import { startDeleteCustomer } from "../../action/customerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomerTable from "./CustomerTable";
const Customers = (props) => {
  const dispatch = useDispatch();

  const [formToggle, setFormToggle] = useState(false);
  const [editdata, setEditdata] = useState({});

  const handelFormToggle = () => {
    setFormToggle(!formToggle);
    setEditdata({});
  };

  const handeldelete = (id) => {
    const isDelete = window.confirm("are you sure....");
    if (isDelete) {
      dispatch(startDeleteCustomer(id));
    }
  };
  const handelEdit = (data) => {
    setEditdata(data);
    setFormToggle(!formToggle);
  };
  return (
    <div className="customer">
      <div className="mb-5">
        {formToggle ? (
          <Customersform
            editdata={editdata}
            handelFormToggle={handelFormToggle}
          />
        ) : null}
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
      <CustomerTable handeldelete={handeldelete} handelEdit={handelEdit} />
    </div>
  );
};

export default Customers;
