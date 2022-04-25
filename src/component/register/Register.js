import React from "react";
import * as Yup from "yup";
import { Textfield, TextArea } from "../commonTextField/Textfield";
import { Formik, Form } from "formik";
import axios from "axios";
import swal from "sweetalert";
const Register = (props) => {
  // const dispatch = useDispatch()
  const validate = Yup.object({
    userName: Yup.string()
      .trim()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
      .required("user name is required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("required"),
    bussiness: Yup.string()
      .required("required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
  });
  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        bussiness: "",
        Adress: "",
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        const formdata = {
          username: values.userName,
          email: values.email,
          password: values.password,
          businessName: values.bussiness,
          address: values.Adress,
        };
        console.log(formdata);
        axios
          .post(
            `https://dct-billing-app.herokuapp.com/api/users/register`,
            formdata
          )
          .then((res) => {
            const result = res.data;
            if (result.createdAt) {
              swal(
                "Good job!",
                "Your Account successfully created!",
                "success"
              );
              props.history.push("/login");
            } else 
              if (result.keyPattern.username) {
                swal({
                  text: "User name must be a unique name",
                  icon: "warning",
                  dangerMode: true,
                });
                }else
                if (result.keyPattern.email) {
                  swal({
                    text: "Email name must be a unique name",
                    icon: "warning",
                    dangerMode: true,
                  });
                }
              
            
           // console.log(result);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }}
    >
      {(formik) => (
        <div className="container mt-5 p-5 mb-5 form">
          {/* {console.log(formik)} */}
          <Form>
            <Textfield
              label="User Name"
              placeholder="Enter User Name"
              type="text"
              name="userName"
              value={formik.values.userName}
            />
            <Textfield
              label="Email"
              placeholder="Enter Email"
              type="text"
              name="email"
              value={formik.values.email}
            />
            <Textfield
              label="Password"
              placeholder="Enter Password"
              type="text"
              name="password"
              value={formik.values.password}
            />
            <Textfield
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
            />
            <Textfield
              label="Bussiness Name"
              placeholder="Bussiness Name"
              type="text"
              name="bussiness"
              value={formik.values.bussiness}
            />
            <TextArea
              label="Address"
              placeholder="Adress"
              name="Adress"
              value={formik.values.Adress}
            />
            <button className="btn btn-primary mt-3" type="submit">
              Save
            </button>{" "}
            <button className="btn btn-danger mt-3" type="reset">
              Reset
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
//css part of register component write on app.css
