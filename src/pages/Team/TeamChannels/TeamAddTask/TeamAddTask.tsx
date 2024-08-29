import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TeamAddTask.module.css";
import { IAddTask } from "../types";
import { addTask } from "../../../../service/teamService";
import { useSelector } from "react-redux";

// import { addTeamChannel } from "../../../../service/teamService";

export default function TeamAddTask({
  setShowFormAddTask,
  channelId,
  setDataChannelsTasks,
}: IAddTask) {
  const [err, setErr] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    taskName: "",
    description: "",
    status: "BACKLOG",
    userId: useSelector((state) => state.auth.data && state.auth.data.userId),
  });
  const onSave = async () => {
    try {
      const response = await addTask(channelId, newTaskData);
      setDataChannelsTasks((prev) => ({
        ...prev,
        tasks: [...prev.tasks, response],
      }));
      setShowFormAddTask(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = () => {
    setShowFormAddTask(false);
    setErr(false);
  };
  return (
    <div className={styles.background}>
      <div className={styles.block}>
        <h2 className={styles.tag}>Добавление Задачи</h2>
        <div className={styles.divName}>
          <p className={styles.pName}>Введите название Задачи</p>
          <input
            className={styles.inpName}
            value={newTaskData?.taskName}
            onChange={(e) =>
              setNewTaskData((prev) => ({
                ...prev,
                taskName: e.target.value,
              }))
            }
          />
          {err && <p className={styles.err}>Обязательное поле</p>}
        </div>
        <div className={styles.divDescription}>
          <p className={styles.pDescription}>Введите описание задачи</p>
          <input
            className={styles.inpDescription}
            value={newTaskData?.description}
            onChange={(e) =>
              setNewTaskData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles.editBtns}>
          <button
            className={styles.save}
            onClick={() =>
              newTaskData?.taskName == "" ? setErr(true) : onSave()
            }
          >
            Сохранить
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
