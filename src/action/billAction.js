import axios from "axios"
export const startAddbill = (formdata,handelSave) => {
    return (dispatch) => {
        axios.post(`http://dct-billing-app.herokuapp.com/api/bills`,formdata,
        {headers: { Authorization: "Bearer " + localStorage.getItem("token")}})
        .then(res=>{
            const result = res.data;
            if(!result.errors){
                dispatch(addbill(result))
                handelSave()
            }else{
                console.log(result.errors)
            }
        })
        .catch(err=>{
            alert('add bill', err.message)
        })
    }
}
 export const startGetAllBills = () => {
     return (dispatch) => {
         axios.get(`http://dct-billing-app.herokuapp.com/api/bills`,
         {headers: { Authorization: "Bearer " + localStorage.getItem("token")}})
        .then(res=>{
            const result = res.data;
            if(!result.errors){
                dispatch(getBills(result.reverse()))
            }else{
                alert(result.errors)
            }
        })
        .catch(err=>{
            alert(err.message)
        })
     }
 }

 export const startDeleteBill = (id) => {
     return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,
         {headers: { Authorization: "Bearer " + localStorage.getItem("token")}})
         .then(res=>{
             const result = res.data;
            dispatch(deleteBill(result))
         })
         .catch(err=>{
             alert(err.message)
         })
     }
 }

 export const startGetBill = (id,goDetail) => {
     return (dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,
        {headers: { Authorization: "Bearer " + localStorage.getItem("token")}})
        .then(res=>{
            const result = res.data;
            console.log(result)
            dispatch(getBill(result))
            goDetail(id)
        })
        .catch(err=>{
            alert(err.message)
        })
     }
 }
 const getBill = (bill) => {
     return{
         type:'GET_BILL',
         payload:bill
     }
 }
 const deleteBill = (bill) => {
     return {
         type:'DELETE_BILL',
         payload:bill
     }
 }
 const getBills = (bills) => {
     return {
         type:'GET_ALL_BILLS',
        payload:bills
     }
 }
const addbill = (bill) =>{
    return {
        type:'ADD_BILL',
        payload:bill
    }
}