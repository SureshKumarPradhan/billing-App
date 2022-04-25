import React from "react";
import { Textfield } from "../commonTextField/Textfield";
import { Formik, Form } from "formik";
import { useDispatch,useSelector } from "react-redux";
import * as Yup from "yup";
import {
  startAddingCustomersData,
  startEditCustomer,
} from "../../action/customerAction";
const Customersform = (props) => {
  const customerData = useSelector(state=>{
    return state.customers.data
  })
  const { handelFormToggle, editdata } = props;
  const { _id, name, email, mobile } = editdata ? editdata : {};
  const dispatch = useDispatch();
  const validate = Yup.object({
    customername: Yup.string()
      .trim()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
      .required("required"),
    customeremail: Yup.string()
      .email(
        "invalid email"
      )
      .required("required"),
    customerphone: Yup.string()
      .required("required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "to short")
      .max(10, "to long"),
  });

  return (
    <Formik
      initialValues={{
        customername: name ? name : "",
        customerphone: mobile ? mobile : "",
        customeremail: email ? email : "",
      }}
      onSubmit={(values, { resetForm }) => {
        const formdata = {
          name: values.customername,
          mobile: values.customerphone,
          email: values.customeremail,
        };
        if (_id) {
          dispatch(
            startEditCustomer(formdata, resetForm, _id, handelFormToggle)
          );
        } else {
          let isCustomer = false;
          customerData.forEach(val=>{
            if((val.email === values.customeremail) || (val.mobile === values.customerphone)){
              isCustomer = true
            }
          })
          if(!isCustomer){
          dispatch(
            startAddingCustomersData(formdata, resetForm, handelFormToggle)
          );
          }else{
            alert('duplicate user')
          }
        }
      }}
      validationSchema={validate}
    >
      {(formik) => (
        <div className={`container w-50 form p-4 mt-4`}>
          <Form>
            <Textfield
              label="customername"
              placeholder="Enter Customer Name"
              name="customername"
              type="text"
              value={formik.values.customername}
            />
            <Textfield
              label="phone"
              placeholder="Enter Phone Number"
              name="customerphone"
              type="text"
              value={formik.values.customerphone}
            />
            <Textfield
              label="email"
              placeholder="Enter Email"
              name="customeremail"
              type="text"
              value={formik.values.customeremail}
            />
            <button className="btn btn-primary mt-4" type="submit">
              Save
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Customersform;
