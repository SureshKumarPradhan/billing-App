import axios from "axios"
export const startAddProduct =(formdata,resetForm,handelToggle)=>{
    return (dispatch) => {
    axios.post(' http://dct-billing-app.herokuapp.com/api/products',formdata,
    {headers:{Authorization: "Bearer " + localStorage.getItem("token") }})
    .then(res=>{
        const result = res.data;
        dispatch(addProduct(result))
        resetForm()
        handelToggle()
    })
    .catch(err=>{alert(err.message)})
    }
}
export const startGetProductdata = ()=>{
    return(dispatch)=>{
      axios.get('http://dct-billing-app.herokuapp.com/api/products',
      {headers:{Authorization: "Bearer " + localStorage.getItem("token") }})
      .then(res=>{
          const result = res.data;
          //console.log(result)
          dispatch(getProductData(result.reverse()))
      })
      .catch(err=>{
          alert(err.message)
      })
    }
}

export const startDeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,
        {headers:{Authorization: "Bearer " + localStorage.getItem('token')}})
        .then(res=>{
            const result = res.data;
            //console.log(result)
            dispatch(deleteProduct(result))
        })
        .catch(err=>{
            alert(err.message)
        })
    }
}

export const startEditProduct = (id,formData,resetForm,handelToggle) => {
  return (dispatch) => {
      axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`,formData,
      {headers:{Authorization: "Bearer " + localStorage.getItem('token')}}
      )
      .then(res=>{
        const result = res.data;
        dispatch(editProduct(result));
        resetForm();
        handelToggle()

      })
      .catch(err=>{
          alert(err.message)
      })  
  }
}
const editProduct = data => {
    return {
      type:'EDIT_PRODUCT',
      payload:data
    }
}
const deleteProduct = (data) => {
    return{
       type:'DELECT_PRODUCT',
       payload:data
    }
}
const getProductData = (data) => {
    return{
        type:"GET_PRODUCT_DATA",
        payload:data
    }
}
const addProduct = (data) => {
    return {
        type:'ADD_PRODUCT',
        payload:data
    }
}