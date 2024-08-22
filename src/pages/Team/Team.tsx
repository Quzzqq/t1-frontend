import styles from "./Team.module.css";
import ownerStar from "../../components/img/ownerStar.png";
import add from "../../components/img/add.png";
import deleteImg from "../../components/img/delete.png";
import { useRef, useState } from "react";

export default function Team() {
  const [choise, setChoise] = useState("main");
  const [tempData, setTempData] = useState({
    first: { name: "William", role: "OWNER" },
    second: { name: "Lilia", role: "MEMBER" },
    third: { name: "Lilia", role: "MEMBER" },
    gsd: { name: "Lilia", role: "MEMBER" },
    fsdafasd: { name: "Lilia", role: "MEMBER" },
    fgads: { name: "Lilia", role: "MEMBER" },
    das: { name: "Lilia", role: "MEMBER" },
    asfv: { name: "Lilia", role: "MEMBER" },
    fads: { name: "Lilia", role: "MEMBER" },
  });

  const membersAreaRef = useRef(null);

  const handleScroll = () => {
    const membersArea = membersAreaRef.current;
    if (membersArea.scrollHeight > membersArea.clientHeight) {
      // If scrollHeight is greater than clientHeight, then it means
      // the content is bigger than the container, hence we show the scrollbar.
      membersArea.style.overflowY = "scroll";
    } else {
      membersArea.style.overflowY = "hidden"; // Remove scrollbar if not needed.
    }
  };
  return (
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
      <div className={styles.all}>
        <div className={styles.descriptionArea}>
          <h4 className={styles.descriptionName}>Описание</h4>
          <textarea
            className={styles.descriptionText}
            name="descriptionText"
            value={"Команда разрабатывает что-то очень крутое"}
          />
        </div>
        <div className={styles.rightArea}>
          <div
            className={styles.membersArea}
            ref={membersAreaRef}
            onScroll={handleScroll}
          >
            <div className={styles.memberInArea}>
              <h4 className={styles.membersName}>Участники</h4>
              <div className={styles.memberPeoples}>
                {Object.entries(tempData).map(([key, people]) => (
                  <div key={people.name} style={{ background: "none" }}>
                    <p key={people.name} className={styles.name}>
                      {people.role == "OWNER" && (
                        <button className={styles.ownerBtn}>
                          <img
                            src={ownerStar}
                            alt="OWNER"
                            className={styles.ownerImg}
                          />
                        </button>
                      )}
                      {people.name}
                      {people.role !== "OWNER" && (
                        <button
                          className={styles.deleteBtn}
                          onClick={() => {
                            const updatedData = { ...tempData };
                            delete updatedData[key];
                            setTempData(updatedData);
                          }}
                        >
                          <img
                            src={deleteImg}
                            alt="delete"
                            className={styles.deleteImg}
                          />
                        </button>
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <div className={styles.roll}></div>
            </div>
          </div>
          <div className={styles.addArea}>
            <h5 className={styles.addName}>Добавить участника</h5>
            <input
              type="email"
              className={styles.addInp}
              placeholder="Введите e-mail"
            />
            <button className={styles.addBtn}>
              <img src={add} alt="add" className={styles.addImg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
