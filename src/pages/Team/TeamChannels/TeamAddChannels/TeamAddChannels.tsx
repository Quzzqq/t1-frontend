import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TeamAddChannels.module.css";
import { addTeamChannel } from "../../../../service/teamService";

export default function TeamAddChannels({ setShowForm, setDataChannels }) {
  const teamId = useParams().id;
  const [err, setErr] = useState(false);
  console.log(teamId);
  const [newChannelData, setNewChannelData] = useState({
    channelTheme: "",
    description: "",
  });
  const onSave = async () => {
    try {
      const response = await addTeamChannel(teamId, newChannelData);
      console.log(response);
      setDataChannels((prev) => ({ ...prev, response }));
      setShowForm(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = () => {
    setShowForm(false);
    setErr(false);
  };
  return (
    <div className={styles.background}>
      <div className={styles.block}>
        <h2 className={styles.tag}>Добавление Канала</h2>
        <div className={styles.divName}>
          <p className={styles.pName}>Введите название канала</p>
          <input
            className={styles.inpName}
            value={newChannelData?.channelTheme}
            onChange={(e) =>
              setNewChannelData((prev) => ({
                ...prev,
                channelTheme: e.target.value,
              }))
            }
          />
          {err && <p className={styles.err}>Обязательное поле</p>}
        </div>
        <div className={styles.divDescription}>
          <p className={styles.pDescription}>Введите описание канала</p>
          <input
            className={styles.inpDescription}
            value={newChannelData?.description}
            onChange={(e) =>
              setNewChannelData((prev) => ({
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
              newChannelData?.channelTheme == "" ? setErr(true) : onSave()
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
