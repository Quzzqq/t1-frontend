import { useFormik } from "formik";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { loginUser } from "../../../store/auth/actionCreators";

export default function Login() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: (values) => {
      alert([values.login, values.password]);
      dispatch(loginUser({ login: values.login, password: values.password }));
    },
  });
  return (
    <>
      <Link to={"/"}>
        <button className={styles.back}>Назад</button>
      </Link>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div>
          <div>
            <label className={styles.lab}>login</label>
            <input
              className={styles.inp}
              name="login"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.login}
            ></input>
          </div>
          <div>
            <label className={styles.lab}>password</label>
            <input
              className={styles.inp}
              name="password"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
          </div>
          <button type="submit" className={styles.btn}>
            go
          </button>
        </div>
      </form>
    </>
  );
}
