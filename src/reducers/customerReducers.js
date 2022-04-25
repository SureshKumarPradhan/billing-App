const intialCustomerState = {
     loading:false,
     data:[],
     error:{}
    }
    const customerReducer = (state = intialCustomerState,action) => {
        switch(action.type){
            case 'ADD_CUSTOMER_DATA': {
                return{...state,data:[{...action.payload},...state.data]}
            }
            case "GET_CUSTOMERS" :{
                return {...state,data:[...action.payload,...state.data]}
            }
            case 'REMOVE_CUSTOMER':{
                return{...state,data:state.data.filter((customer)=>{
                   return customer._id !== action.payload._id;
                })}
            }
            case 'EDIT_CUSTOMER' : {
                return {...state,data:state.data.map(val=>{
                    if(val._id === action.payload._id){
                        return {...action.payload}
                    }
                    else{
                        return {...val};
                    }
                })}
            }
            default:{
                return {...state}
            }
        }
    }
    export default customerReducer