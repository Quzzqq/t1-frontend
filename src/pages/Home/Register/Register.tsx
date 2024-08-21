import { useFormik } from "formik";
import styles from "./Register.module.css";
import { useAppDispatch } from "../../../redux/store";
import { fetchRegister, selectIsAuth } from "../../../redux/slices/auth";
import * as Yup from "Yup";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SignUpSchema = Yup.object().shape({
  username: Yup.string().email("Неверный email").required("Обязательное поле"),
  name: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(15, "Максимум 15 букв")
    .required("Обязательное поле"),
  surname: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(15, "Максимум 15 букв")
    .required("Обязательное поле"),
  patronymic: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(15, "Максимум 15 букв")
    .required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

export default function Register() {
  const isAuth = useSelector(selectIsAuth);
  const [showErrors, setShowErrors] = useState(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      surname: "",
      patronymic: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      setShowErrors(true);
      try {
        const data = await dispatch(fetchRegister(values));
        localStorage.setItem("token", data.payload.accessToken);
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isAuth) {
    return <Navigate to={"/"} />;
  }
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
              type="email"
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
            {showErrors && formik.errors.name && (
              <p className={styles.err}>{formik.errors.name}</p>
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
            <label className={styles.lab}>Фамилия</label>
            <br />
            <input
              placeholder="Введите Фамилию"
              className={styles.inp}
              name="surname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.surname}
            ></input>
            {showErrors && formik.errors.surname && (
              <p className={styles.err}>{formik.errors.surname}</p>
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
            <label className={styles.lab}>Отчество</label>
            <br />
            <input
              placeholder="Введите Отчество"
              className={styles.inp}
              name="patronymic"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.patronymic}
            ></input>
            {showErrors && formik.errors.patronymic && (
              <p className={styles.err}>{formik.errors.patronymic}</p>
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
            Создать
          </button>
        </form>
      </div>
    </>
  );
}
