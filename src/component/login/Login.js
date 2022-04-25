import * as Yup from "yup";
import { Textfield } from "../commonTextField/Textfield";
import { Formik, Form } from "formik";
import { NavLink,useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { startLogin } from '../../action/userAction';
const Login = (props) => {
  const history =useHistory()
  const dispatch = useDispatch();
    const validate = Yup.object({
        email: Yup.string().required("required").email('enter a valid email'),
        password: Yup.string().required(),
      });
      const error = useSelector(state=>{
        return state.user.error;
      })
      const toHomePage = () => {
        history.push('/')
      }
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
       const formdata = {
         email:values.email,
         password:values.password
       }
       dispatch(startLogin(formdata,toHomePage))
      }}
    >
      {(formik) => (
        <div className="container mt-5 p-5 form">
          <Form>
          <div className="text-danger">{error && error}</div>
            <Textfield
              label="Email"
              placeholder="Enter Email"
              type="text" 
              name="email"
            />
            <Textfield
              label="Password"
              placeholder="Enter  password"
              type="password"
              name="password"
            />
            <button className="btn btn-primary mt-3" type="submit">
            sign-in
            </button>{" "}
            <button className="btn btn-danger mt-3" type="button">
              <NavLink to="/register">sign-up</NavLink>
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default Login;
//css part of this component write on 