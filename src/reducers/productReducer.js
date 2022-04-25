const initialProductData = {
    loading:false,
     data:[],
     error:{}
}

const productReducers = (state = initialProductData,action) => {
    switch(action.type){
        case('ADD_PRODUCT'):{
            return {...state,data:[{...action.payload},...state.data]}
        }
        case('GET_PRODUCT_DATA'):{
            return {...state,data:[...action.payload]}
        }
        case('DELECT_PRODUCT'):{
            return{...state,data:state.data.filter((product)=>{
                return product._id !== action.payload._id;
             })}
        }
        case ('EDIT_PRODUCT'):{
            return {...state,data:state.data.map(product=>{
                if(product._id === action.payload._id){
                    return {...action.payload}
                }else{
                   return {...product}
                }
            })}
        }
        default:{
          return  {...state}
        }
    }
}
export default productReducers;