import styles from "./TeamMain.module.css";
import ownerStar from "../../../components/img/ownerStar.png";
import add from "../../../components/img/add.png";
import deleteImg from "../../../components/img/delete.png";
import { useEffect, useRef, useState } from "react";

export default function TeamMain() {
  const [choise, setChoise] = useState("main");
  const [data, setData] = useState({
    text: "Команда разрабатывает что-то очень крутое",
    users: {
      first: { name: "William", role: "OWNER", id: "1" },
      second: { name: "Lilia", role: "MEMBER", id: "2" },
      third: { name: "Lilia", role: "MEMBER", id: "3" },
      gsd: { name: "Lilia", role: "MEMBER", id: "4" },
      fsdafasd: { name: "Lilia", role: "MEMBER", id: "5" },
      fgads: { name: "Lilia", role: "MEMBER", id: "6" },
      das: { name: "Lilia", role: "MEMBER", id: "7" },
      asfv: { name: "Lilia", role: "MEMBER", id: "8" },
      fads: { name: "Lilia", role: "MEMBER", id: "9" },
    },
  });
  const [tempData, setTempData] = useState();
  const [activeEdit, setActiveEdit] = useState(false);
  const membersAreaRef = useRef(null);

  const handleScroll = () => {
    const membersArea = membersAreaRef.current;
    if (membersArea.scrollHeight > membersArea.clientHeight) {
      membersArea.style.overflowY = "scroll";
    } else {
      membersArea.style.overflowY = "hidden";
    }
  };

  const onSave = async () => {
    // await profileSave(data);
    setActiveEdit(false);
    setTempData(data);
  };

  const onCancel = () => {
    setData(tempData);
    setActiveEdit(false);
  };
  useEffect(() => {
    setTempData(data);
  }, []);

  return (
    <div className={styles.all}>
      <div className={styles.descriptionArea}>
        <h4 className={styles.descriptionName}>Описание</h4>
        <textarea
          className={styles.descriptionText}
          name="descriptionText"
          value={data.text}
          onChange={(e) => {
            setActiveEdit(true);
            setData((prev) => ({ ...prev, text: e.target.value }));
          }}
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
              {Object.entries(data.users).map(([key, people]) => (
                <div key={people.id} style={{ background: "none" }}>
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
                          setActiveEdit(true);
                          const updatedUsers = Object.entries(data.users)
                            .filter(([k, p]) => k !== key)
                            .reduce((acc, [k, p]) => ({ ...acc, [k]: p }), {});
                          setData((prev) => ({
                            ...prev,
                            users: updatedUsers,
                          }));
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
        {activeEdit ? (
          <div className={styles.editBtns}>
            <button className={styles.save} onClick={onSave}>
              Сохранить
            </button>
            <button className={styles.cancel} onClick={onCancel}>
              Отмена
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
