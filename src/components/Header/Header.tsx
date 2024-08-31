import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useAppDispatch } from "../../redux/store";
import Select from "react-select";
import star from "../img/star.png";
import {
  acceptInvite,
  checkInvites,
  declineInvite,
  takeTeamFromFind,
} from "../../service/HomeService";
import { IDataTeam, IMyTeaM, INotifications } from "./types";
import { takeMyTeams } from "../../service/teamService";
import BellWithAlert from "../../components/img/BellWithAlert.png";
import BellWithoutAlert from "../../components/img/BellWithOutAlert.png";

export default function Header() {
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>(window.location.pathname);
  const [dataInvites, setDataInvites] = useState<INotifications[]>();
  const [optionsTeams, setOptionsTeams] = useState<IDataTeam>([]);
  const [focus, setFocus] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [value, setValue] = useState("");
  const [valueMyTeams, setValueMyTeams] = useState("");
  const notificationRef = useRef(null);
  const [listMyTeams, setListMyTeams] = useState<IMyTeaM>();
  const [startTimeout, setStartTimeout] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const userId = useSelector(
    (state) => state.auth.data && state.auth.data.userId
  );
  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      event.target.name !== "accept" &&
      event.target.name !== "cancel"
    ) {
      setOpenNotification(false);
    }
  };

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkCurrentInvites = async () => {
      const response = await checkInvites(userId);
      setDataInvites(response);
    };
    const takeTeams = async () => {
      const response = await takeMyTeams(userId);
      setListMyTeams(response);
    };

    checkCurrentInvites();
    takeTeams();
  }, [userId, openNotification]);

  const handleAccept = async (team: INotifications) => {
    try {
      if (window.confirm("Вы действительно хотите принять приглашение?")) {
        setOpenNotification(false);
        await acceptInvite(team.id);
        setDataInvites((prev) => prev?.filter((item) => item !== team));
      }
    } catch (err) {
      alert("Произошла ошибка");
      console.log(err);
    }
  };
  const handleDecline = async (team: INotifications) => {
    try {
      if (window.confirm("Вы действительно не хотите принять приглашение?")) {
        setOpenNotification(false);
        await declineInvite(team.id);
        setDataInvites((prev) => prev?.filter((item) => item !== team));
      }
    } catch (err) {
      alert("Произошла ошибка");
      console.log(err);
    }
  };
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
      </div>

      {isAuth || localStorage.getItem("token") ? (
        <div className={styles.signInBtns}>
          <div className={styles.findBarMyTeams}>
            <h4 className={styles.findHMyTeams}>Мои команды</h4>
            <Select
              placeholder="Введите команду"
              options={
                listMyTeams &&
                listMyTeams.teams.map((team) => ({
                  ...team,
                  value: team.teamName,
                  label: team.teamName,
                }))
              }
              className={styles.findMyTeams}
              value={valueMyTeams}
              onChange={(selectedOption) => {
                navigate(`/team/${selectedOption.id}`, { replace: true });
              }}
              onInputChange={(newValue) => {
                setValueMyTeams(newValue);
              }}
              maxMenuHeight={130}
            />
          </div>
          <div
            ref={notificationRef}
            className={styles.notificationAreaFull}
            onClick={() => setOpenNotification((prev) => !prev)}
            onBlur={() => setOpenNotification(false)}
          >
            <div className={styles.invitesBtn}>
              <img
                src={dataInvites ? BellWithAlert : BellWithoutAlert}
                alt="notification"
                className={styles.notificatonsImg}
              />
            </div>
            <div
              className={styles.notificationArea}
              style={openNotification ? {} : { display: "none" }}
            >
              {dataInvites ? (
                dataInvites.map((team: INotifications) => (
                  <div className={styles.notification}>
                    <h4 className={styles.notificationH}>
                      Вас пригласили в команду!
                    </h4>
                    <Link
                      to={`/team/${team.team.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <p className={styles.notificationP}>
                        {team.team.teamName}
                      </p>
                    </Link>
                    <div className={styles.btnsNotification}>
                      <button
                        name="accept"
                        className={styles.confirmInvite}
                        onClick={() => handleAccept(team)}
                      >
                        Принять
                      </button>
                      <button
                        name="cancel"
                        className={styles.cancelInvite}
                        onClick={() => handleDecline(team)}
                      >
                        Отказаться
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.notification}>
                  <h4 className={styles.notificationH}>Нет приглашений</h4>
                </div>
              )}
            </div>
          </div>

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
