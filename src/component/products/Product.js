import React, { useState } from "react";
import Productform from "./ProductForm";
import { useDispatch } from "react-redux";
import { startDeleteProduct } from "../../action/productAction";
import ProductTable from "./ProductTable";
import "../customears/customer.css";
const Product = (props) => {
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
      dispatch(startDeleteProduct(id));
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
          <Productform
            editdata={editdata}
            handelFormToggle={handelFormToggle}
          />
        ) : null}
      </div>
      <div className={`text-center icon ${formToggle && "iconMinus"}`}>
        <i
          className={!formToggle ? `fas fa-plus` : `fas fa-minus`}
          onClick={handelFormToggle}
        ></i>
      </div>
      <ProductTable handeldelete={handeldelete} handelEdit={handelEdit} />
    </div>
  );
};

export default Product;
