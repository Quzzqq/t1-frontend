import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useAppDispatch } from "../../redux/store";

export default function Header() {
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>(window.location.pathname);
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const onLeave = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      localStorage.removeItem("token");
    }
  };
  return (
    <header>
      <Link to={"/"} className={styles.starLink}>
        <img
          className={styles.star}
          src="star.png"
          alt="Логотип"
          onClick={() => {
            setLocation("");
          }}
        ></img>
      </Link>
      <div className={styles.findBar}>
        <img
          src="search.png"
          alt="find"
          className={styles.findImg}
          style={focus || value != "" ? { display: "none" } : {}}
        />
        <input
          placeholder="Введите команду"
          type="text"
          className={styles.find}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
      </div>
      {isAuth || localStorage.getItem("token") ? (
        <div className={styles.signInBtns}>
          <button className={styles.logout} onClick={onLeave}>
            Выйти
          </button>
          <button
            className={styles.profile}
            onClick={() => {
              navigate(`/user/${localStorage.getItem("id")}`);
            }}
          >
            Профиль
          </button>
        </div>
      ) : (
        <div className={styles.btns}>
          <Link to={"/registration"} className={styles.link}>
            <button
              className={styles.signUp}
              style={
                location === "/registration"
                  ? { backgroundColor: "#7EEB4B" }
                  : {}
              }
              onClick={() => {
                setLocation("/registration");
              }}
            >
              Регистрация
            </button>
          </Link>
          <Link to={"/login"} className={styles.link}>
            <button
              className={styles.signIn}
              style={
                location === "/login" ? { backgroundColor: "#7EEB4B" } : {}
              }
              onClick={() => {
                setLocation("/login");
              }}
            >
              Войти
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
