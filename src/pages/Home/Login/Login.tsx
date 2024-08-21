import { useFormik } from "formik";
import styles from "./Login.module.css";
import { useAppDispatch } from "../../../redux/store";
import {
  fetchAuth,
  fetchUsers,
  fetchRefresh,
  selectIsAuth,
} from "../../../redux/slices/auth";
import * as Yup from "Yup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInSchema = Yup.object().shape({
  username: Yup.string().email("Неверный email").required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});
export default function Login() {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [showErrors, setShowErrors] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  const formik = useFormik({
    initialValues: {
      username: "mikesmith@yahoo.com",
      password: "user",
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      setShowErrors(true);
      try {
        const data = await dispatch(fetchAuth(values));
        console.log(data);
        localStorage.setItem("token", data.payload.accessToken);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const takeUsers = async () => {
    const data = await dispatch(fetchUsers());
    console.log(data);
  };
  const fetchRefr = async () => {
    const data = await dispatch(fetchRefresh());
    console.log(data);
  };

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
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            ></input>
            {showErrors && formik.errors.username && (
              <p className={styles.err}>{formik.errors.username}</p>
            )}
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
            {showErrors && formik.errors.password && (
              <p className={styles.err}>{formik.errors.password}</p>
            )}
            <hr
              style={{
                height: "1px",
                marginTop: "20px",
                backgroundColor: "black",
              }}
            />
          </div>
          <button
            type="submit"
            className={styles.btn}
            onClick={() => {
              setShowErrors(true);
            }}
          >
            Войти
          </button>
        </form>
      </div>

      {/* <button onClick={() => takeUsers()}>123</button>
      <button onClick={() => fetchRefr()}>refresh</button> */}
    </>
  );
}
