import { useRef, useState } from "react";
import styles from "./TeamChannels.module.css";
import deleteImg from "../../../components/img/delete.png";
import addImg from "../../../components/img/add.png";

export default function TeamChannel() {
  const [dataChannels, setDataChannels] = useState([
    { id: 0, channelTheme: "frontend" },
    { id: 1, channelTheme: "backend" },
    { id: 2, channelTheme: "designs" },
    { id: 3, channelTheme: "frontend" },
    { id: 4, channelTheme: "backend" },
    { id: 5, channelTheme: "designs" },
    { id: 6, channelTheme: "frontend" },
    // { id: 7, channelTheme: "backend" },
    // { id: 8, channelTheme: "designs" },
  ]);
  const tempDataChannel = {
    description: "Новое описание задачи",
    tasks: [
      {
        id: 1,
        taskName: "Новая задача",
        status: "BACKLOG",
        userId: 1,
      },
    ],
  };

  const [selectedChannel, setSelectedChannel] = useState(dataChannels[0].id);
  const [selectedTypeTask, setSelectedTypeTask] = useState("all");
  const channelsAreaRef = useRef(null);
  const tasksAreaRef = useRef(null);

  const handleScrollChannelsArea = (string) => {
    const channelsArea = channelsAreaRef.current;
    if (channelsArea.scrollHeight > channelsArea.clientHeight) {
      channelsArea.style.overflowY = "scroll";
    } else {
      channelsArea.style.overflowY = "hidden";
    }
  };
  const handleScrollTasksArea = (string) => {
    const tasksArea = tasksAreaRef.current;
    if (tasksArea.scrollHeight > tasksArea.clientHeight) {
      tasksArea.style.overflowY = "scroll";
    } else {
      tasksArea.style.overflowY = "hidden";
    }
  };

  return (
    <div className={styles.all}>
      <div className={styles.channels}>
        <h3 className={styles.channelsName}>Каналы</h3>
        <div
          className={styles.channelsBtns}
          ref={channelsAreaRef}
          onScroll={handleScrollChannelsArea}
        >
          {Object.values(dataChannels).map((channel) => (
            <button
              className={styles.channelsBtn}
              value={channel.channelTheme}
              onClick={() => setSelectedChannel(channel.id)}
              style={
                selectedChannel == channel.id ? { background: "#9A9A9A" } : {}
              }
              key={channel.id}
            >
              {channel.channelTheme}
              <button className={styles.deleteBtn}>
                <img
                  src={deleteImg}
                  alt="delete"
                  className={styles.deleteImg}
                />
              </button>
            </button>
          ))}
        </div>

        <button className={styles.add}>
          <img src={addImg} alt="add" className={styles.addImg} />
        </button>
      </div>

      <div className={styles.descriptionArea}>
        <h3 className={styles.descriptionName}>Описание</h3>
        <textarea
          type="text"
          value={tempDataChannel.taskName}
          className={styles.description}
        />
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
          <div
            className={styles.taskArea}
            ref={tasksAreaRef}
            onScroll={handleScrollTasksArea}
          >
            {Object.values(tempDataChannel.tasks).map((task) => (
              <div className={styles.task} key={task.id}>
                {task.taskName}
                <div className={styles.taskP}>{task.status}</div>
                <button className={styles.deleteBtn}>
                  <img
                    src={deleteImg}
                    alt="delete"
                    className={styles.deleteImg}
                  />
                </button>
              </div>
            ))}
          </div>
          <button className={styles.add}>
            <img src={addImg} alt="add" className={styles.addImg} />
          </button>
        </div>
      </div>
    </div>
  );
}
