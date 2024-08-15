import { useFormik } from "formik";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

export default function Register() {
  const formik = useFormik({
    initialValues: {
      login: "",
      name: "",
      password: "",
    },
    onSubmit: (values) => {
      alert([values.login, values.name, values.password]);
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
            <label className={styles.lab}>name</label>
            <input
              className={styles.inp}
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
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
