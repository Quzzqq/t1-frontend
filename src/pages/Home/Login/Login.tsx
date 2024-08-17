import { useFormik } from "formik";
import styles from "./Login.module.css";
import { useAppDispatch } from "../../../redux/store";
import { fetchAuth } from "../../../redux/slices/auth";

export default function Login() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const data = await dispatch(fetchAuth(values));
    },
  });
  return (
    <>
      <div className={styles.block}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.back}>
            <label className={styles.lab}>E-mail</label>
            <br />
            <input
              placeholder="Введите почту"
              className={styles.inp}
              name="login"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.login}
            ></input>
            <hr
              style={{
                height: "1px",
                marginTop: "20px",
                backgroundColor: "black",
              }}
            />
          </div>
          <div className={styles.back}>
            <label className={styles.lab}>Пароль</label>
            <br />
            <input
              placeholder="Введите пароль"
              className={styles.inp}
              name="password"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
            <hr
              style={{
                height: "1px",
                marginTop: "20px",
                backgroundColor: "black",
              }}
            />
          </div>
          <button type="submit" className={styles.btn}>
            Войти
          </button>
        </form>
      </div>
    </>
  );
}
