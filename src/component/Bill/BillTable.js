import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startGetBill } from '../../action/billAction';
import './bill.css'
const BillTable = (props) => {
  const history = useHistory()
    const dispatch = useDispatch()
    const billList = useSelector((state)=>{
       return state.bills.data;
    })
    const customer = useSelector(state=>{
        return state.customers.data
    })
   // console.log("bill list",billList)
    const [filterbills,setFilterbills] = useState(billList) 
    const [count,setcount] = useState(5)
    const [initialIndex,setInitialIndex] = useState(0)
    useEffect(()=>{
        setFilterbills(billList)
    },[billList])
    //console.log(customersList)
    let countList = 1;
    const length = billList.length;
    const {  handeldelete } = props;
  
    const handelBack = () => {
      setcount(count-5)
      setInitialIndex(initialIndex-5);
    }
    const handelNext = () => {
      setcount(count+5)
      setInitialIndex(count);
    }
     
   // console.log(customer)
   const goDetail = (id) =>{
    history.push(`/bills/${id}`)
   }
    const showDetail = (id)=> {
      dispatch(startGetBill(id,goDetail))
    
    }
    const cname = (id) => {
      const customerName = customer.find(val=>{
        return val._id == id
      })
      return  customerName.name
    }
    return(
        <>
         <div className="container table_body ">
        <div className='filter mb-5'>
        <div className='d-flex justify-content-end'>
        <div className="filter_btn  ">
            <button className="btn btn-dark back" disabled={initialIndex <= 0?true:false} onClick={handelBack}>back</button>
            <button className="btn btn-dark" disabled={count<length?false:true} onClick={handelNext}>next</button>{" "}
          </div>
        </div>
        </div>
        <table className="table table-hover text-center mt-5" style={{color:'#fff'}}>
          <thead>
            <tr>
              <th>#</th>
              <th>Customers</th>
              <th>price</th>
              <th>Details</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {filterbills.slice(initialIndex,count).map((val) => {
             
              return (
                <tr key={val._id}>
                  <td>{countList++}</td>
                  <td>{cname(val.customer)}</td>
                  <td>{val.total}</td>
                  <td>
                    <button className="btn btn-outline-primary" onClick={()=>{showDetail(val._id)}}> Details</button>
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
export default BillTable;