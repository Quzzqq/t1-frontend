import { useEffect, useRef, useState } from "react";
import styles from "./TeamChannels.module.css";
import deleteImg from "../../../components/img/delete.png";
import addImg from "../../../components/img/add.png";
import {
  deleteTeamChannel,
  takeChannelData,
  takeTeamChannels,
} from "../../../service/teamService";
import { useParams } from "react-router-dom";
import TeamAddChannels from "./TeamAddChannels/TeamAddChannels";
import { IDataChannel } from "./types";
import { IAdmin } from "../types";

export default function TeamChannel({ admin }: IAdmin) {
  const [showForm, setShowForm] = useState(false);
  const teamId = useParams().id;
  const [dataChannels, setDataChannels] = useState([
    { id: 0, channelTheme: "" },
  ]);

  const [dataChannelsTasks, setDataChannelsTasks] = useState<IDataChannel>();
  const [selectedChannelId, setSelectedChannelId] = useState<number>();
  const [selectedTypeTask, setSelectedTypeTask] = useState("ALL");
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
  const handleDelete = async (channelId) => {
    try {
      if (window.confirm("Вы действительно хотите удалить это достижение?")) {
        await deleteTeamChannel(channelId);
        setDataChannels((prev) => prev.filter((item) => item.id != channelId));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const takeChannels = async () => {
      const response = await takeTeamChannels(teamId);
      setDataChannels(response);
      setSelectedChannelId(response && response[0].id);
    };
    takeChannels();
  }, []);
  useEffect(() => {
    const takeData = async () => {
      const response = await takeChannelData(selectedChannelId);
      setDataChannelsTasks(response);
    };
    takeData();
  }, [selectedChannelId]);
  // console.log(dataChannelsTasks);
  return (
    <>
      {showForm && (
        <TeamAddChannels
          setShowForm={setShowForm}
          setDataChannels={setDataChannels}
        />
      )}
      <div className={styles.all}>
        <div className={styles.channels}>
          <h3 className={styles.channelsName}>Каналы</h3>
          <div
            className={styles.channelsBtns}
            ref={channelsAreaRef}
            onScroll={handleScrollChannelsArea}
          >
            {dataChannels &&
              Object.values(dataChannels).map((channel) => (
                <button
                  className={styles.channelsBtn}
                  value={channel.channelTheme}
                  onClick={() => {
                    setSelectedChannelId(channel.id);
                    setSelectedTypeTask("ALL");
                  }}
                  style={
                    selectedChannelId == channel.id
                      ? { background: "#9A9A9A" }
                      : {}
                  }
                  key={channel.id}
                >
                  {channel.channelTheme}
                  {admin && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(channel.id)}
                    >
                      <img
                        src={deleteImg}
                        alt="delete"
                        className={styles.deleteImg}
                      />
                    </button>
                  )}
                </button>
              ))}
          </div>
          {admin && (
            <button className={styles.add} onClick={() => setShowForm(true)}>
              <img src={addImg} alt="add" className={styles.addImg} />
            </button>
          )}
        </div>

        <div className={styles.descriptionArea}>
          <h3 className={styles.descriptionName}>Описание</h3>
          <textarea
            type="text"
            value={dataChannelsTasks?.description}
            className={styles.description}
            readOnly={!admin}
            onChange={(e) =>
              dataChannelsTasks &&
              dataChannelsTasks((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles.tasks}>
          <h3 className={styles.tasksName}>Задачи</h3>
          <div className={styles.tasksArea}>
            <div className={styles.tasksHeader}>
              <button
                style={
                  selectedTypeTask == "ALL" ? { background: "#979797" } : {}
                }
                className={styles.tasksHeaderBtn}
                onClick={() => setSelectedTypeTask("ALL")}
              >
                Все
              </button>
              <button
                style={
                  selectedTypeTask == "TESTING" ? { background: "#979797" } : {}
                }
                className={styles.tasksHeaderBtn}
                onClick={() => setSelectedTypeTask("TESTING")}
              >
                На проверке
              </button>
              <button
                style={
                  selectedTypeTask == "IN_PROGRESS"
                    ? { background: "#979797" }
                    : {}
                }
                className={styles.tasksHeaderBtn}
                onClick={() => setSelectedTypeTask("IN_PROGRESS")}
              >
                В работе
              </button>
              <button
                style={
                  selectedTypeTask == "BACKLOG" ? { background: "#979797" } : {}
                }
                className={styles.tasksHeaderBtn}
                onClick={() => setSelectedTypeTask("BACKLOG")}
              >
                Очередь
              </button>
              <button
                style={
                  selectedTypeTask == "DONE" ? { background: "#979797" } : {}
                }
                className={styles.tasksHeaderBtn}
                onClick={() => setSelectedTypeTask("DONE")}
              >
                Готово
              </button>
            </div>
            <div
              className={styles.taskArea}
              ref={tasksAreaRef}
              onScroll={handleScrollTasksArea}
            >
              {dataChannelsTasks &&
                Object.values(dataChannelsTasks?.tasks).map((task) => (
                  <>
                    {console.log(task.status, selectedTypeTask)}
                    {(task.status == selectedTypeTask ||
                      selectedTypeTask == "ALL") && (
                      <div
                        className={styles.task}
                        key={task.id}
                        style={
                          task.status == "BACKLOG"
                            ? { background: "#FF5555" }
                            : task.status == "IN_PROGRESS"
                            ? { background: "#E9FF61" }
                            : task.status == "TESTING"
                            ? { background: "#93F7C7" }
                            : {
                                background: "#9B93FF",
                              }
                        }
                      >
                        {/* {console.log(task.status)} */}
                        {task.taskName}
                        <div className={styles.taskP}>{task.status}</div>
                        {admin && (
                          <button className={styles.deleteBtn}>
                            <img
                              src={deleteImg}
                              alt="delete"
                              className={styles.deleteImg}
                            />
                          </button>
                        )}
                      </div>
                    )}
                  </>
                ))}
            </div>
            {admin && (
              <button className={styles.add}>
                <img src={addImg} alt="add" className={styles.addImg} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
