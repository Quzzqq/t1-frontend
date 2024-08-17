import { useFormik } from "formik";
import styles from "./Register.module.css";
import { useAppDispatch } from "../../../redux/store";
import { fetchRegister } from "../../../redux/slices/auth";

export default function Register() {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      login: "",
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values.login, values.name, values.password);
      const data = await dispatch(fetchRegister(values));
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
              type="email"
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
            <label className={styles.lab}>Имя</label>
            <br />
            <input
              placeholder="Введите имя"
              className={styles.inp}
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
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
            Создать
          </button>
        </form>
      </div>
    </>
  );
}
