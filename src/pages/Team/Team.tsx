import { useEffect, useState } from "react";
import styles from "./Team.module.css";
import TeamMain from "./TeamMain/TeamMain";
import TeamAchievments from "./TeamAchievments/TeamAchievments";
import { useParams } from "react-router-dom";
import { takeIdAdmin, takeNameTeam } from "../../service/teamService";
import TeamChannel from "./TeamChannels/TeamChannels";
import { useSelector } from "react-redux";

export default function Team() {
  const [choise, setChoise] = useState("main");
  const [name, setName] = useState("");
  const [idAdmin, setIdAdmin] = useState<number>();
  const groupId = useParams().id;

  const userId = useSelector((state) =>
    state.auth.data ? state.auth.data.userId : null
  );
  const [admin, setAdmin] = useState<boolean>(false);
  useEffect(() => {
    const requests = async () => {
      const response = await takeNameTeam(groupId);
      setName(response);
      const responseIdAdmin = await takeIdAdmin(groupId);
      setIdAdmin(responseIdAdmin);
    };
    requests();
  }, []);
  useEffect(() => {
    setAdmin(idAdmin === userId);
  }, [idAdmin, userId]);
  return (
    <>
      <div className={styles.back}>
        <div className={styles.header}>
          <h3 className={styles.teamName}>{name}</h3>
          <div className={styles.btns}>
            <button
              className={styles.btn}
              style={choise == "main" ? { background: "rgb(157 255 140)" } : {}}
              onClick={() => setChoise("main")}
            >
              Главная
            </button>
            <button
              className={styles.btn}
              style={
                choise == "achievements"
                  ? { background: "rgb(157 255 140)" }
                  : {}
              }
              onClick={() => setChoise("achievements")}
            >
              Достижения
            </button>
            <button
              className={styles.btn}
              style={
                choise == "channels" ? { background: "rgb(157 255 140)" } : {}
              }
              onClick={() => setChoise("channels")}
            >
              Каналы
            </button>
          </div>
        </div>
        {choise == "main" && <TeamMain name={name} admin={admin} />}
        {choise == "achievements" && <TeamAchievments admin={admin} />}
        {choise == "channels" && <TeamChannel admin={admin} />}
      </div>
    </>
  );
}
