import React,{useEffect} from "react";
import './dashboard.css'
import { useSelector } from "react-redux";
import DashboardCard from "./DashboardCard";
import DashboardBox from "./DashboardBox";
//import GoogleChart from './GoogleChart .tsx';
const Dashboard = (props) => {
    const state = useSelector(state=>{
        return state;
    })

 const todayIncome = () => {
     const bills = state.bills.data;
     const todayBill = bills.filter(ele=>ele.date.slice(0,10) === new Date().toISOString().slice(0,10));
     return todayBill.length > 0 ?  todayBill.reduce((a,b) => ({total:a.total+b.total})).total: 0
 }
    return (
        <div className="dashboard">
        <div className="container-fluid dashboardCard_body" >
        <DashboardCard fastValue="Total Customer" secondValue={state.customers.data.length} order='1' />
        <DashboardCard fastValue="Total Product" secondValue={state.product.data.length} order='2' />
        <DashboardCard fastValue="Total Bill" secondValue={state.bills.data.length} order='3'/>
        <DashboardCard fastValue="Today Income" secondValue={todayIncome()} order='4'/>
        </div>
        <div className="dashboard-box container-fluid">
        <DashboardBox currentFiveData={state.customers.data} footer='Recent five customers'/>
        <DashboardBox currentFiveData={state.product.data} footer='Recent five products'/>
        </div>
         {/* <GoogleChart/> */}
        </div>
    )
}

export default Dashboard;