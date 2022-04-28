import axios from "axios";
export const startAddingCustomersData = (
  formdata,
  resetForm,
  handelFormToggle
) => {
  return (dispatch) => {
    axios
      .post(" https://dct-pos-app.herokuapp.com/api/customers", formdata, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const result = res.data;
        //console.log(result);
        dispatch(addCustometdata(result));
        resetForm();
        handelFormToggle();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const startgetCustometdata = () => {
  return (dispatch) => {
    axios
      .get(`https://dct-pos-app.herokuapp.com/api/customers`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const result = res.data;
          //console.log(result)
        dispatch(getCustomer(result.reverse()));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
export const startDeleteCustomer = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://dct-pos-app.herokuapp.com/api/customers/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const result = res.data;
        dispatch(removeCustomer(result));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
export const startEditCustomer = (
  formdata,
  resetForm,
  _id,
  handelFormToggle
) => {
  return (dispatch) => {
    axios
      .put(
        `https://dct-pos-app.herokuapp.com/api/customers/${_id}`,
        formdata,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        const result = res.data;
        dispatch(editCustomer(result));
        resetForm()
        handelFormToggle()
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

const editCustomer = (data) => {
  return {
    type: "EDIT_CUSTOMER",
    payload: data,
  };
};
const removeCustomer = (data) => {
  return {
    type: "REMOVE_CUSTOMER",
    payload: data,
  };
};
const getCustomer = (data) => {
  return {
    type: "GET_CUSTOMERS",
    payload: data,
  };
};
const addCustometdata = (data) => {
  return {
    type: "ADD_CUSTOMER_DATA",
    payload: data,
  };
};
