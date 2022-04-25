import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import Filtercomponent from '../filterComponent/Filtercomponent';
const ProductTable = (props) => {
    const productList = useSelector((state)=>{
       return state.product.data
    })
    const [filterCustomers,setFilterCustomers] = useState(productList) 
    const [count,setcount] = useState(5)
    const [initialIndex,setInitialIndex] = useState(0)
    useEffect(()=>{
     setFilterCustomers(productList)
    },[productList])
    //console.log(customersList)
    let countList = 1;
    const length = productList.length;
    const { handelEdit, handeldelete } = props;
    const handelInput = (phone) => {
        //  if(phone){
        //   const filterval = customersList.filter(val=>{
        //         return val.mobile.includes(phone)
        //      })
        //      setFilterCustomers(filterval)
        //  }
    }
    const handelSelectVal = (selectVal) => {
      const A_ZVal = productList.slice(0).sort((a, b) => a.name < b.name ? - 1 : Number(a.name > b.name))
      const Z_AVal = productList.slice(0).sort((a, b) => a.name > b.name ? - 1 : Number(a.name > b.name))
      if(selectVal === 'A-Z'){
       setFilterCustomers(A_ZVal)
      }else if(selectVal === 'Z-A'){
       setFilterCustomers(Z_AVal)
      }else{
        setFilterCustomers(productList)
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
    return(
        <>
         <div className="container table_body ">
         <div className="d-flex justify-content-arround mt-5  mb-3  filter">
        <Filtercomponent  handelInput={handelInput} handelSelectVal={handelSelectVal} placeholder="search by name" />
        <div className="filter_btn">
            <button className="btn btn-dark" disabled={initialIndex <= 0?true:false} onClick={handelBack}>back</button>{" "}
            <button className="btn btn-dark" disabled={count<length?false:true} onClick={handelNext}>next</button>
          </div>
      </div>
        <table className="table table-hover text-center" style={{color:'#fff'}}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>price</th>
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
                  <td>{val.price}</td>
                  <td>
                    <button className="btn btn-outline-primary" onClick={()=>{handelEdit(val)}}> Edit </button>
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
    )
}
export default ProductTable;