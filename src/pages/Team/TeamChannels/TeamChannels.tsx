import { useState } from "react";
import styles from "./TeamChannels.module.css";
import deletePng from "../../../components/img/delete.png";
import addPng from "../../../components/img/add.png";

export default function TeamChannel() {
  const [dataChannels, setDataChannels] = useState({
    0: {
      name: "front",
      description: "Поверстать",
      tasks: ["Сверстать страницу", "Придумать решение задачи"],
      id: "0",
    },
    1: {
      name: "backend",
      description: "Сервер написать",
      tasks: ["Сервер написать", "Придумать решение задачи"],
      id: "1",
    },
    2: {
      name: "design",
      description: "Сделать figma",
      tasks: ["Сделать figma", "Придумать решение задачи"],
      id: "2",
    },
  });
  const [selectedChannel, setSelecteDChannel] = useState(dataChannels[0]);
  const [selectedTypeTask, setSelectedTypeTask] = useState("all");
  return (
    <div className={styles.all}>
      <div className={styles.channels}>
        <h3 className={styles.channelsName}>Каналы</h3>
        {Object.values(dataChannels).map((channel) => (
          <button
            className={styles.channelsBtn}
            value={channel.name}
            onClick={() => selectedChannel(dataChannels[channel.id])}
          >
            <img src={deletePng} alt="delete" />
          </button>
        ))}
        <button className={styles.add}>
          <img src={addPng} alt="add" />
        </button>
      </div>
      <div className={styles.description}>
        <h3 className={styles.descriptionName}>Описание</h3>
        <input type="text" value={selectedChannel.description} />
      </div>
      <div className={styles.tasks}>
        <h3 className={styles.tasksName}>Задачи</h3>
        <div className={styles.tasksArea}>
          <div className={styles.tasksHeader}>
            <button
              className={styles.tasksHeaderBtn}
              onClick={() => setSelectedTypeTask("all")}
            >
              Все
            </button>
            <button
              className={styles.tasksHeaderBtn}
              onClick={() => setSelectedTypeTask("verification")}
            >
              На проверке
            </button>
            <button
              className={styles.tasksHeaderBtn}
              onClick={() => setSelectedTypeTask("work")}
            >
              В работе
            </button>
            <button
              className={styles.tasksHeaderBtn}
              onClick={() => setSelectedTypeTask("queue")}
            >
              Очередь
            </button>
            <button
              className={styles.tasksHeaderBtn}
              onClick={() => setSelectedTypeTask("complete")}
            >
              Готово
            </button>
          </div>
          <div className={styles.taskArea}>
            {Object.values(selectedChannel).map((task) => (
              <div className={styles.task}>
                <p className={styles.taskP}>{}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
