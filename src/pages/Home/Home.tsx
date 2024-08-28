import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { takeRandomTeams } from "../../service/HomeService";
import starImg from "../../components/img/ownerStar.png";
import { ITeams } from "./types";
import TeamAdd from "./TeamAdd/TeamAdd";

const Home = () => {
  const userId = useSelector(
    (state) => state.auth.data && state.auth.data.userId
  );
  // const dispatch = useAppDispatch();
  // console.log(id);
  const [data, setData] = useState<ITeams>([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    const takeTeams = async () => {
      const response = await takeRandomTeams();
      setData(response);
    };
    takeTeams();
  }, []);
  const moreTeams = async () => {
    const response = await takeRandomTeams();
    // console.log(response);
    setData((prev) => [...prev, ...response]);
  };
  return (
    <>
      {showForm && <TeamAdd userId={userId} setShowForm={setShowForm} />}
      <div className={styles.all}>
        <div className={styles.teamsAreaFull}>
          <div className={styles.teamsArea}>
            {data?.map((team) => (
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
            <button className={styles.btnMore} onClick={moreTeams}>
              Показать еще
            </button>
          </div>
        </div>
        <div className={styles.filterArea}>
          <button className={styles.addTeam} onClick={() => setShowForm(true)}>
            Создать команду
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
