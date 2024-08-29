import { useEffect, useRef, useState } from "react";
import styles from "./TeamChannels.module.css";
import deleteImg from "../../../components/img/delete.png";
import addImg from "../../../components/img/add.png";
import {
  deleteTaskChannel,
  deleteTeamChannel,
  putTeamChannelsNames,
  takeChannelData,
  takeTeamChannels,
} from "../../../service/teamService";
import { useParams } from "react-router-dom";
import TeamAddChannels from "./TeamAddChannels/TeamAddChannels";
import { IDataChannel, INameChannel, ITask } from "./types";
import { IAdmin } from "../types";
import TeamAddTask from "./TeamAddTask/TeamAddTask";
import TeamEditTask from "./TeamEditTask/TeamEditTask";

export default function TeamChannel({ admin }: IAdmin) {
  const [activeEdit, setActiveEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFormAddTask, setShowFormAddTask] = useState(false);
  const [activeFormEditTask, setActiveFormEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask>();
  const teamId = useParams().id;
  const [dataChannels, setDataChannels] = useState([
    { id: 0, channelTheme: "", description: "" },
  ]);

  const [dataChannelsTasks, setDataChannelsTasks] = useState<IDataChannel>();
  const [selectedChannel, setSelectedChannel] = useState<INameChannel>();
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
      if (window.confirm("Вы действительно хотите удалить этот канал?")) {
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
      setSelectedChannel(
        response
          ? response[0]
          : {
              description: "",
              tasks: [
                {
                  id: 0,
                  taskName: "",
                  description: "",
                  status: "",
                  userId: "",
                },
              ],
            }
      );
    };
    takeChannels();
  }, [teamId]);
  useEffect(() => {
    const takeData = async () => {
      const response = await takeChannelData(selectedChannel.id);
      setDataChannelsTasks(response);
    };
    takeData();
  }, [selectedChannel]);
  const onSave = async () => {
    try {
      await putTeamChannelsNames(selectedChannel);
      setDataChannels((prev) => {
        const channelIndex = prev.findIndex(
          (channel) => channel.id === selectedChannel.id
        );
        if (channelIndex !== -1) {
          return [
            ...prev.slice(0, channelIndex),
            { ...selectedChannel },
            ...prev.slice(channelIndex + 1),
          ];
        } else {
          return [...prev, { ...selectedChannel }];
        }
      });

      setActiveEdit(false);
    } catch (err) {
      alert("Произошла ошибка");
      console.log(err);
    }
  };
  useEffect(() => {}, [dataChannels]);
  const onCancel = () => {
    setActiveEdit(false);
    setSelectedChannel(
      dataChannels.find((data) => data.id === selectedChannel.id)
    );
    setError(false);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      if (window.confirm("Вы действительно хотите удалить задачу?")) {
        await deleteTaskChannel(taskId);
        setDataChannelsTasks((prev) => {
          if (prev?.tasks) {
            return {
              ...prev,
              tasks: prev.tasks.filter((item) => item.id !== taskId),
            };
          }
          return prev;
        });
      }
    } catch (err) {
      alert("Не удалось удалить");
      console.log(err);
    }
  };

  // console.log(selectedChannel);
  return (
    <>
      {showForm && (
        <TeamAddChannels
          setShowForm={setShowForm}
          setDataChannels={setDataChannels}
        />
      )}
      {showFormAddTask && (
        <TeamAddTask
          setShowFormAddTask={setShowFormAddTask}
          channelId={selectedChannel.id}
          setDataChannelsTasks={setDataChannelsTasks}
        />
      )}
      {activeFormEditTask && (
        <TeamEditTask
          setActiveFormEditTask={setActiveFormEditTask}
          selectedTask={selectedTask}
          setDataChannelsTasks={setDataChannelsTasks}
          admin={admin}
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
                    setSelectedChannel(channel);
                    setSelectedTypeTask("ALL");
                  }}
                  style={
                    selectedChannel == channel ? { background: "#9A9A9A" } : {}
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
          <h3 className={styles.channelsNameH}>Название</h3>
          {/* {console.log(selectedChannel)} */}
          <textarea
            type="text"
            value={selectedChannel?.channelTheme}
            className={styles.channelNameInp}
            readOnly={!admin}
            onChange={(e) => {
              selectedChannel &&
                setSelectedChannel((prev) => ({
                  ...prev,
                  channelTheme: e.target.value,
                }));
              setActiveEdit(true);
            }}
          />
          <h3 className={styles.descriptionName}>Описание</h3>
          <textarea
            type="text"
            value={selectedChannel?.description}
            className={styles.description}
            readOnly={!admin}
            onChange={(e) => {
              selectedChannel &&
                setSelectedChannel((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              setActiveEdit(true);
            }}
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
                    {(task.status == selectedTypeTask ||
                      selectedTypeTask == "ALL") && (
                      <div
                        className={styles.task}
                        key={task.id}
                        style={
                          task.status == "BACKLOG"
                            ? {
                                // background: "#FF5555"
                                background:
                                  "linear-gradient(to right, #FF5555 70%, #FFFFFF 100%)",
                              }
                            : task.status == "IN_PROGRESS"
                            ? {
                                background:
                                  "linear-gradient(to right, #E9FF61 70%, #FFFFFF 100%)",
                              }
                            : task.status == "TESTING"
                            ? {
                                background:
                                  "linear-gradient(to right, #93F7C7 70%, #FFFFFF 100%)",
                              }
                            : {
                                background:
                                  "linear-gradient(to right, #9B93FF 70%, #FFFFFF 100%)",
                              }
                        }
                      >
                        {/* {console.log(task.status)} */}
                        <button
                          onClick={() => {
                            setActiveFormEditTask(true);
                            setSelectedTask(task);
                          }}
                          className={styles.btnSetActive}
                          value={task.taskName}
                        >
                          <p className={styles.pSetActive}>{task.taskName}</p>
                        </button>

                        <div className={styles.taskP}>{task.status}</div>
                        {admin && (
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeleteTask(task.id)}
                          >
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
              <button
                className={styles.add}
                onClick={() => setShowFormAddTask(true)}
              >
                <img src={addImg} alt="add" className={styles.addImg} />
              </button>
            )}
          </div>
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
    </>
  );
}
