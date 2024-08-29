import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useAppDispatch } from "../../redux/store";
import Select from "react-select";
import star from "../img/star.png";
import search from "../img/search.png";
import { checkInvites, takeTeamFromFind } from "../../service/HomeService";
import DropDownNotifications from "./DropDownNotifications/DropDownNotifications";
import { IDataTeam } from "./types";
// import { INotifications } from "./types";
// import Notifications from "react-notifications-menu";

export default function Header() {
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>(window.location.pathname);
  const [dataInvites, setDataInvites] = useState<INotifications>();
  const [optionsTeams, setOptionsTeams] = useState<IDataTeam>([]);
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const isAuth = useSelector(selectIsAuth);
  const userId = useSelector(
    (state) => state.auth.data && state.auth.data.userId
  );
  const handleChangeFind = async (newValue) => {
    try {
      const response = await takeTeamFromFind(newValue);
      setOptionsTeams(response);
    } catch (err) {
      console.log(err);
    }
  };

  const dispatch = useAppDispatch();
  const onLeave = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/");
      setLocation("");
    }
  };
  useEffect(() => {
    const checkCurrentInvites = async () => {
      const response = await checkInvites(userId);
      setDataInvites(response);
    };
    checkCurrentInvites();
  }, [userId]);
  // console.log(dataInvites);
  return (
    <header>
      <Link to={"/"} className={styles.starLink}>
        <img
          className={styles.star}
          src={star}
          alt="Логотип"
          onClick={() => {
            setLocation("");
          }}
        ></img>
      </Link>
      <div className={styles.findBar}>
        <h4 className={styles.findH}>Найти команду</h4>
        <Select
          placeholder="Введите команду"
          options={
            optionsTeams &&
            optionsTeams.map((team) => ({
              ...team,
              value: team.teamName,
              label: team.teamName,
            }))
          }
          className={styles.find}
          value={value}
          onChange={(selectedOption) => {
            console.log(selectedOption);
            navigate(`/team/${selectedOption.id}`, { replace: true });
          }}
          onInputChange={(newValue) => {
            setValue(newValue);
            handleChangeFind(newValue);
          }}
          maxMenuHeight={130}
        />
        {/* <input
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
        /> */}
      </div>

      {isAuth || localStorage.getItem("token") ? (
        <div className={styles.signInBtns}>
          {/* <Notifications /> */}
          {/* <DropDownNotifications dataInvites={dataInvites} /> */}

          <button className={styles.logout} onClick={onLeave}>
            Выйти
          </button>
          <button
            className={styles.profile}
            onClick={() => {
              navigate(`/user/${userId}`);
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
