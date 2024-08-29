import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TeamEditTask.module.css";
import { ITask, ITaskDataForEdit } from "../types";
import { editTask } from "../../../../service/teamService";

export default function TeamEditTask({
  setActiveFormEditTask,
  selectedTask,
  setDataChannelsTasks,
  admin,
}: ITaskDataForEdit) {
  const closeFormRef = useRef(null);
  const teamId = useParams().id;
  const [err, setErr] = useState(false);
  const [currentTaskData, setCurrentTaskData] = useState<ITask>(selectedTask);
  const onSave = async () => {
    try {
      await editTask(currentTaskData);
      setDataChannelsTasks((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) => {
          if (task.id === currentTaskData.id) {
            return {
              ...task,
              taskName: currentTaskData.taskName,
              description: currentTaskData.description,
              status: currentTaskData.status,
            };
          } else {
            return task;
          }
        }),
      }));
      setActiveFormEditTask(false);
    } catch (e) {
      alert("Произошла ошибка");
      console.log(e);
      setActiveFormEditTask(false);
    }
  };

  const onCancel = () => {
    setActiveFormEditTask(false);
  };

  const handleBackgroundClick = (e) => {
    if (closeFormRef.current && e.target.dataset.name == "back") {
      setActiveFormEditTask(false);
    }
  };

  return (
    <div
      className={styles.background}
      onClick={handleBackgroundClick}
      ref={closeFormRef}
      data-name="back"
    >
      <div className={styles.block}>
        <h2 className={styles.tag}>Информация о задачи</h2>
        <div className={styles.divName}>
          <p className={styles.pName}>Название задачи</p>
          <input
            className={styles.inpName}
            value={currentTaskData.taskName}
            readOnly={!admin}
            onChange={(e) =>
              setCurrentTaskData((prev) => ({
                ...prev,
                taskName: e.target.value,
              }))
            }
          />
          {err && <p className={styles.err}>Обязательное поле</p>}
        </div>
        <div className={styles.divDescription}>
          <p className={styles.pDescription}>Описание задачи</p>
          <input
            className={styles.inpDescription}
            value={currentTaskData?.description}
            readOnly={!admin}
            onChange={(e) =>
              setCurrentTaskData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles.divTaskStatus}>
          <p className={styles.pTaskStatus}>Статус задачи</p>
          <div className={styles.taskStatusArea}>
            <button
              className={styles.taskStatusBtn}
              style={
                currentTaskData.status == "TESTING"
                  ? { background: "#979797" }
                  : {}
              }
              onClick={() => {
                admin &&
                  setCurrentTaskData((prev) => ({
                    ...prev,
                    status: "TESTING",
                  }));
              }}
            >
              На проверке
            </button>
            <button
              className={styles.taskStatusBtn}
              style={
                currentTaskData.status == "IN_PROGRESS"
                  ? { background: "#979797" }
                  : {}
              }
              onClick={() => {
                admin &&
                  setCurrentTaskData((prev) => ({
                    ...prev,
                    status: "IN_PROGRESS",
                  }));
              }}
            >
              В работе
            </button>
            <button
              className={styles.taskStatusBtn}
              style={
                currentTaskData.status == "BACKLOG"
                  ? { background: "#979797" }
                  : {}
              }
              onClick={() => {
                admin &&
                  setCurrentTaskData((prev) => ({
                    ...prev,
                    status: "BACKLOG",
                  }));
              }}
            >
              Очередь
            </button>
            <button
              className={styles.taskStatusBtn}
              style={
                currentTaskData.status == "DONE"
                  ? { background: "#979797" }
                  : {}
              }
              onClick={() => {
                admin &&
                  setCurrentTaskData((prev) => ({
                    ...prev,
                    status: "DONE",
                  }));
              }}
            >
              Готово
            </button>
          </div>
        </div>
        {admin && (
          <div className={styles.editBtns}>
            <button
              className={styles.save}
              onClick={() =>
                currentTaskData.taskName == "" ? setErr(true) : onSave()
              }
            >
              Сохранить
            </button>
            <button className={styles.cancel} onClick={onCancel}>
              Отмена
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
