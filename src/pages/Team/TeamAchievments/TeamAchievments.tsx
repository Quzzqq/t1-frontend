import styles from "./TeamAchievments.module.css";
import deletePng from "../../../components/img/delete.png";
import addPng from "../../../components/img/add.png";
import { useRef, useState } from "react";
import randomString from "random-string";

export default function TeamAchievments() {
  const [activeEdit, setActiveEdit] = useState(false);
  const [data, setData] = useState({
    t1: { name: "t1", description: "Победили все" },
    yandex: { name: "yandex", description: "Выйграли турнир" },
  });
  const [tempData, setTempData] = useState(data);
  const [error, setError] = useState(false);
  const achievmentAreaRef = useRef(null);

  const handleScroll = () => {
    const achievmentArea = achievmentAreaRef.current;
    if (achievmentArea.scrollHeight > achievmentArea.clientHeight) {
      achievmentArea.style.overflowY = "scroll";
    } else {
      achievmentArea.style.overflowY = "hidden";
    }
  };
  const handleDelete = (key) => {
    setActiveEdit(true);
    setData((prev) => {
      const updateData = { ...prev };
      delete updateData[key];
      return updateData;
    });
  };

  const onSave = () => {
    if (Object.values(data).some((item) => item.name === "")) {
      setError(true);
    } else {
      setActiveEdit(false);
      setTempData(data);
      setError(false);
    }
  };

  const onCancel = () => {
    setActiveEdit(false);
    setData(tempData);
    setError(false);
  };

  return (
    <>
      <div
        className={styles.achievmentArea}
        ref={achievmentAreaRef}
        onScroll={handleScroll}
      >
        {Object.entries(data).map(([key, achievement]) => (
          <div className={styles.achievment} key={key}>
            <div className={styles.achievementName}>
              <h3 className={styles.achievementNameHeader}>Название</h3>
              <input
                type="text"
                placeholder="Введите название"
                className={styles.achievementNameInp}
                maxLength={14}
                required={true}
                value={achievement.name}
                onChange={(e) => {
                  setActiveEdit(true);
                  setData((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], name: e.target.value },
                  }));
                }}
              ></input>
              {error && <p className={styles.error}>Обязательное поле</p>}
            </div>
            <div className={styles.achievementDescription}>
              <h3 className={styles.achievementDescriptionHeader}>Описание</h3>
              <input
                type="text"
                placeholder="Введите описание"
                className={styles.achievementDescriptionInp}
                value={achievement.description}
                onChange={(e) => {
                  setActiveEdit(true);
                  setData((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], description: e.target.value },
                  }));
                }}
              ></input>
            </div>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(key)}
            >
              <img src={deletePng} alt="delete" className={styles.deleteImg} />
            </button>
          </div>
        ))}
        <button
          className={styles.addBtn}
          onClick={() => {
            setActiveEdit(true);
            const key = randomString({ length: 6 });
            setData((prev) => ({
              ...prev,
              [key]: { name: "", description: "" },
            }));
          }}
        >
          <img src={addPng} alt="add" className={styles.addImg} />
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
    </>
  );
}
