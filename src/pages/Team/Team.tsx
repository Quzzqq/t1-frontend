import { useEffect, useState } from "react";
import styles from "./Team.module.css";
import TeamMain from "./TeamMain/TeamMain";
import TeamAchievments from "./TeamAchievments/TeamAchievments";
import { useParams } from "react-router-dom";
import { takeNameTeam } from "../../service/teamService";
import TeamChannel from "./TeamChannels/TeamChannels";
import { useSelector } from "react-redux";

export default function Team() {
  const [choise, setChoise] = useState("main");
  const [name, setName] = useState("");
  // const userId = useSelector((state) => state.auth.data && state.auth.data.id);
  // const groupId = useParams().id;
  const userId = 1;
  const groupId = 1;
  const [admin, setAdmin] = useState(userId == groupId);
  useEffect(() => {
    const takeName = async () => {
      const response = await takeNameTeam(groupId);
      setName(response);
    };
    takeName();
  }, []);
  console.log(admin);
  console.log(name);
  return (
    <>
      <div className={styles.back}>
        <div className={styles.header}>
          <h3 className={styles.teamName}>{name}</h3>
          <div className={styles.btns}>
            <button
              className={styles.btn}
              style={choise == "main" ? { background: "#FFF5C2" } : {}}
              onClick={() => setChoise("main")}
            >
              Главная
            </button>
            <button
              className={styles.btn}
              style={choise == "achievements" ? { background: "#FFF5C2" } : {}}
              onClick={() => setChoise("achievements")}
            >
              Достижения
            </button>
            <button
              className={styles.btn}
              style={choise == "channels" ? { background: "#FFF5C2" } : {}}
              onClick={() => setChoise("channels")}
            >
              Каналы
            </button>
          </div>
        </div>
        {choise == "main" && <TeamMain name={name} />}
        {choise == "achievements" && <TeamAchievments />}
        {choise == "channels" && <TeamChannel />}
      </div>
    </>
  );
}
