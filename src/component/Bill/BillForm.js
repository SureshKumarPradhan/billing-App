import React, { useState, useEffect } from "react";
import "../customears/customer.css";
import { useDispatch, useSelector } from "react-redux";
import { startAddbill } from "../../action/billAction";
import { isLogin } from "./../../action/userAction";
const BillForm = (props) => {
  const { handelFormToggle } = props;
  const dispatch = useDispatch();
  const bill = useSelector((state) => {
    return state.bills.data;
  });
  //console.log(bill)
  const [date, setDate] = useState("");
  const [customer, setcustomer] = useState("");
  const [dynamicform, setdynamicform] = useState([
    { product: "", quantity: 1 },
  ]);
  const [totalCost, setTotalCost] = useState(0);

  const customerData = useSelector((state) => {
    return state.customers.data;
  });
  const productData = useSelector((state) => {
    return state.product.data;
  });
  const addtotal = (product, quantity) => {
    return productData.find((ele) => ele._id === product).price * quantity;
  };
  useEffect(() => {
    if (
      dynamicform.every((ele) => {
        return ele.product;
      })
    ) {
      let total = 0;
      dynamicform.forEach((ele) => {
        total += addtotal(ele.product, ele.quantity);
      });
      setTotalCost(total);
    }
  }, [dynamicform]);
  const handleform = (e) => {
    if (e.target.name === "date") {
      setDate(e.target.value);
    } else if (e.target.name === "customer") {
      setcustomer(e.target.value);
    }
  };
  const handelChange = (i, e) => {
    let newFormValues = [...dynamicform];
    newFormValues[i][e.target.name] = e.target.value;
    setdynamicform(newFormValues);
  };
  const handelSubmit = (e) => {
    e.preventDefault();

    const formdata = {
      date: date,
      customer: customer,
      lineItems: [...dynamicform],
    };
    const resetform = () => {
      setDate("");
      setcustomer("");
      setdynamicform([{ product: "", quantity: 1 }]);
      handelFormToggle();
    };
    dispatch(startAddbill(formdata, resetform));
  };
  const addForm = () => {
    setdynamicform([...dynamicform, { product: "", quantity: 1 }]);
  };
  const removeform = (i) => {
    let newFormValues = [...dynamicform];
    newFormValues.splice(i, 1);
    setdynamicform(newFormValues);
  };
  return (
    <div className="container w-50 form p-4 mt-4 form billdate">
      <form onSubmit={handelSubmit}>
        <div>
          <h3 className="text-end">{`Total : ${totalCost} -/`}</h3>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            value={date}
            name="date"
            className={`form-control `}
            id="date"
            onChange={handleform}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Customers" className="form-label">
            Customers
          </label>
          <select
            className={`form-select `}
            value={customer}
            name="customer"
            id="Customers"
            onChange={handleform}
          >
            <option value="">Customers</option>
            {customerData.map((val) => {
              return (
                <option key={val._id} value={val._id}>
                  {val.name}
                </option>
              );
            })}
          </select>
        </div>
        {dynamicform.map((ele, i) => {
          return (
            <div className="d-flex justify-content-between mb-3" key={i}>
              <div className="mb-3">
                <label htmlFor={`product ${i}`} className="form-label">
                  Products
                </label>
                <select
                  className={`form-select `}
                  name="product"
                  value={dynamicform[i].product || ""}
                  onChange={(e) => handelChange(i, e)}
                  id={`product ${i}`}
                >
                  <option value="">Products</option>
                  {productData.map((val) => {
                    return (
                      <option key={val._id} value={val._id}>
                        {val.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                className={`mt-5`}
                style={{ marginRight: `${i == 0 && "13rem"}` }}
              >
                <input
                  type="text"
                  style={{ width: "30px" }}
                  name="quantity"
                  value={dynamicform[i].quantity || ""}
                  onChange={(e) => handelChange(i, e)}
                  id={`quantity ${i}`}
                />
              </div>
              {i ? (
                <div className="md-3">
                  <button
                    className="btn btn-danger text-center mt-5"
                    type="button"
                    onClick={() => {
                      removeform(i);
                    }}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
        <div className="md-3">
          <button className="btn btn-primary" type="button" onClick={addForm}>
            Add product
          </button>{" "}
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillForm;
