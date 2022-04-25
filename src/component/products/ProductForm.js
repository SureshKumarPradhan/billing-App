import React from "react";
import { Textfield } from "../commonTextField/Textfield";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { startAddProduct, startEditProduct } from "../../action/productAction";
const Productform = (props) => {
  const { handelFormToggle, editdata } = props;
  const { _id, name, price } = editdata ? editdata : {};
  const dispatch = useDispatch();
  const productsData = useSelector((state) => {
    return state.product.data;
  });
  const validate = Yup.object({
    name: Yup.string()
      .trim()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
      .required("required"),
    price: Yup.string().required("required"),
  });

  return (
    <Formik
      initialValues={{
        name: name ? name : "",
        price: price ? price : "",
      }}
      onSubmit={(values, { resetForm }) => {
       // console.log(values)
        const formdata = {
          name: values.name,
          price: values.price,
        };
        if (_id) {
          dispatch(
            startEditProduct(_id, formdata, resetForm, handelFormToggle)
          );
        } else {
          let isproduct = false;
          productsData.forEach((product) => {
            if (product.name === values.name) {
              isproduct = true;
            }
          });
          if (!isproduct) {
            dispatch(startAddProduct(formdata, resetForm, handelFormToggle));
          } else {
            alert("duplicate product");
          }
        }
      }}
      validationSchema={validate}
    >
      {(formik) => (
        <div className={`container w-50 form p-4 mt-4 cform`}>
          <Form>
            <Textfield
              label="Product Name"
              placeholder="Enter Product Name"
              name="name"
              type="text"
              value={formik.values.name}
            />
            <Textfield
              label="Product Price"
              placeholder="Product Price"
              name="price"
              type="text"
              value={formik.values.price}
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

export default Productform;
