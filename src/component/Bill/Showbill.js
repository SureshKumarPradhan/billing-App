import React from "react";
// import swal from '@sweetalert/with-react'
//  import Invoice from "./Invoice";
// import { PDFDownloadLink ,PDFViewer} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
const ShowBill = (props) => {
  const state = useSelector((state) => {
    return state;
  });
  console.log(state.bills.bill)
  const CustomerName = () => {
    const name = state.customers.data.find(
      (val) => val._id == state.bills.bill.customer
    );
    return name;
  };
  const productName = (id) => {
    const name = state.product.data.find((val) => val._id == id);
    return name;
  };
  //console.log(state.bills.bill.lineItems);
  return (
    <div className="showbill_body">
      <div className="container w-50 showbill mb-5">
        <div className="">
          <p className="mt-3 text-dark"> Customer Name : {CustomerName().name}</p>
          <p className="mt-3">Bill Date : {state.bills.bill.createdAt}</p>
          <div className="d-flex flex-column mt-3">
            <p>
              {" "}
              Items :
              <table className="table">
                <thead>
                  <tr>
                    <th>product</th>
                    <th>Quantity</th>
                    <th>price</th>
                  </tr>
                </thead>
                <tbody>
              {state.bills.bill.lineItems.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{productName(val.product).name} </td>
                    <td > {val.quantity} </td>
                    <td > {val.price} </td>
                  </tr>
                );
              })}

                </tbody>
              </table>
            </p>
          </div>
          <p>total : {state.bills.bill.total}</p>
      
           {/* <Invoice/> */}
         
          {/* <PDFDownloadLink className="mt-3 btm btn-warning p-2">Generate Invoice</PDFDownloadLink> */}
        </div>
      </div>
    </div>
  );
};
export default ShowBill;
