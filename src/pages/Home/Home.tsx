import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { takeRandomTeams } from "../../service/HomeService";
import starImg from "../../components/img/ownerStar.png";

const Home = () => {
  // const id = useSelector((state) => state.auth.data && state.auth.data);
  // const dispatch = useAppDispatch();
  // console.log(id);
  const [tempData, setTempData] = useState([
    {
      id: 1,
      teamName: "Новая команда",
      userCount: 5,
      adminEmail: "ivanov@mail.ru",
      adminName: "Иванов Иван Иванович",
    },
  ]);
  useEffect(() => {
    const takeTeams = async () => {
      const response = await takeRandomTeams();
      console.log(response);
    };
    takeTeams();
  });
  return (
    <div className={styles.all}>
      <div className={styles.teamsAreaFull}>
        <div className={styles.teamsArea}>
          {tempData.map((team) => (
            <div className={styles.team} key={team.id}>
              <Link to={`/team/${team.id}`} className={styles.link}>
                <h3 className={styles.teamName}>{team.teamName}</h3>
              </Link>
              <p className={styles.teamCount}>
                Кол-во участников: {team.userCount}
              </p>
              <div className={styles.teamAdmin}>
                <img
                  src={starImg}
                  alt="admin"
                  className={styles.teamAdminImg}
                />
                {team.adminName}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.filterArea}>
        <button className={styles.addTeam}>Создать команду</button>
      </div>
    </div>
  );
};

export default Home;
