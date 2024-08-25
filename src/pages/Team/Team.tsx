import { useState } from "react";
import styles from "./Team.module.css";
import TeamMain from "./TeamMain/TeamMain";
import TeamAchievments from "./TeamAchievments/TeamAchievments";

export default function Team() {
  const [choise, setChoise] = useState("achievements");

  return (
    <>
      <div className={styles.back}>
        <div className={styles.header}>
          <h3 className={styles.teamName}>Название</h3>
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
        {choise == "main" && <TeamMain />}
        {choise == "achievements" && <TeamAchievments />}
      </div>
    </>
  );
}
