import React from "react";
import { useField, ErrorMessage } from "formik";
export const Textfield = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  //console.log(field)
  return (
    <>
      <div className="form-group">
        <label htmlFor={field.name}>{label}</label>
        <input
          {...field}
          {...props}
          className={`form-control input shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          id={field.name}
          autoComplete="off"
        />
        <ErrorMessage
          name={field.name}
          component="div"
          className="error"
        ></ErrorMessage>
      </div>
    </>
  );
};
export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  //console.log(field)
  return (
    <>
      <div className="form-group mb-3">
        <label htmlFor={field.name}>{label}</label>
        <textarea
          className={`form-control input shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          id={field.name}
          autoComplete="off"
        />
        <ErrorMessage
          name={field.name}
          component="div"
          className="error"
        ></ErrorMessage>
      </div>
    </>
  );
};




//css part of this component write on
