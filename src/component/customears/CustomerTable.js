import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import Filtercomponent from "../filterComponent/Filtercomponent";
const CustomerTable = (props) => {
  let customersList = useSelector((state) => {
    return state.customers.data;
  });
  
  const [filterCustomers,setFilterCustomers] = useState(customersList) 
  const [count,setcount] = useState(5)
  const [initialIndex,setInitialIndex] = useState(0)
  useEffect(()=>{
   setFilterCustomers(customersList)
  },[customersList])
  //console.log(customersList)
  let countList = 1;
  const length = customersList.length;
  const { handelEdit, handeldelete } = props;
  const handelInput = (phone) => {
       if(phone){
        const filterval = customersList.filter(val=>{
              return val.mobile.includes(phone)
           })
           setFilterCustomers(filterval)
       }
  }
  const handelSelectVal = (selectVal) => {
    const A_ZVal = customersList.slice(0).sort((a, b) => a.name < b.name ? - 1 : Number(a.name > b.name))
    const Z_AVal = customersList.slice(0).sort((a, b) => a.name > b.name ? - 1 : Number(a.name > b.name))
    if(selectVal === 'A-Z'){
     setFilterCustomers(A_ZVal)
    }else if(selectVal === 'Z-A'){
     setFilterCustomers(Z_AVal)
    }else{
      setFilterCustomers(customersList)
    }
  }
  const handelBack = () => {
    setcount(count-5)
    setInitialIndex(initialIndex-5);

  }
  const handelNext = () => {
    setcount(count+5)
    setInitialIndex(count);
  }
 // console.log(count,initialIndex)
  return (
    <>
      <div className="container  table_body ">
      <div className="d-flex justify-content-arround mt-5  mb-3  filter">
        <Filtercomponent  handelInput={handelInput} handelSelectVal={handelSelectVal} placeholder="search by phone" />
        <div className="filter_btn">
            <button className="btn btn-dark" disabled={initialIndex <= 0?true:false} onClick={handelBack}>back</button>{" "}
            <button className="btn btn-dark" disabled={count<length?false:true} onClick={handelNext}>next</button>
          </div>
      </div>
        <table className="table table-hover text-center" style={{color:"#fff"}}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {filterCustomers.slice(initialIndex,count).map((val) => {
              return (
                <tr key={val._id}>
                  <td>{countList++}</td>
                  <td>{val.name}</td>
                  <td>{val.mobile}</td>
                  <td>{val.email}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        handelEdit(val);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        handeldelete(val._id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CustomerTable;
