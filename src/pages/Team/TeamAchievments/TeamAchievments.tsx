import styles from "./TeamAchievments.module.css";
import deletePng from "../../../components/img/delete.png";
import addPng from "../../../components/img/add.png";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { takeTeamAchievements } from "../../../service/teamService";
import { ITeamAchievements } from "../types";

export default function TeamAchievments() {
  const { id } = useParams("id");
  const [activeEdit, setActiveEdit] = useState(false);
  const [data, setData] = useState<ITeamAchievements>();
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
  const handleDelete = (key: number) => {
    setActiveEdit(true);
    setData((prev) => prev.filter((item) => item.id !== key));
  };

  const onSave = () => {
    if (data.some((item) => item.achievementName === "")) {
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

  const handleAddAchievement = () => {
    setActiveEdit(true);
    const newId = data.reduce((maxId, item) => Math.max(maxId, item.id) + 1, 0);
    setData((prev) => [
      ...prev,
      { id: newId, achievementName: "", description: "" },
    ]);
  };

  useEffect(() => {
    const takeResponse = async () => {
      const response = await takeTeamAchievements(id);
      setData(response);
    };
    takeResponse();
    setTempData(data);
  }, []);
  console.log(data);
  return (
    <>
      <div
        className={styles.achievmentArea}
        ref={achievmentAreaRef}
        onScroll={handleScroll}
      >
        {data?.map((achievement) => (
          <div className={styles.achievment} key={achievement.id}>
            <div className={styles.achievementName}>
              <h3 className={styles.achievementNameHeader}>Название</h3>
              <input
                type="text"
                placeholder="Введите название"
                className={styles.achievementNameInp}
                // maxLength={14}
                required={true}
                value={achievement.achievementName}
                onChange={(e) => {
                  setActiveEdit(true);
                  setData((prev) =>
                    prev.map((item) =>
                      item.id === achievement.id
                        ? { ...item, achievementName: e.target.value }
                        : item
                    )
                  );
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
                  setData((prev) =>
                    prev.map((item) =>
                      item.id === achievement.id
                        ? { ...item, description: e.target.value }
                        : item
                    )
                  );
                }}
              ></input>
            </div>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(achievement.id)}
            >
              <img src={deletePng} alt="delete" className={styles.deleteImg} />
            </button>
          </div>
        ))}
        <button className={styles.addBtn} onClick={handleAddAchievement}>
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
