import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TeamDiscordForm.module.css";
import { patchDiscordData } from "../../../service/teamService";

export default function TeamDiscordForm({
  setActiveForm,
  discordData,
  setDiscordData,
}) {
  const teamId = useParams().id;
  const [newDiscordData, setNewDiscordData] = useState({
    discordLink: discordData.discordLink,
    discordGuildId: discordData.discordGuildId,
  });
  const onSave = async () => {
    try {
      await patchDiscordData(teamId, newDiscordData);
      setDiscordData(newDiscordData);
      setActiveForm(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = () => {
    setActiveForm(false);
  };
  return (
    <div className={styles.background}>
      <div className={styles.block}>
        <h2 className={styles.tag}>Добавление Дискорд бота</h2>
        <div className={styles.AddBot}>
          <a
            className={styles.AddBotA}
            href="https://discord.com/oauth2/authorize?client_id=1277337470945591346&permissions=8&integration_type=0&scope=bot"
          >
            <p className={styles.AddBotP}>Добавьте бота на сервер</p>
          </a>
        </div>
        <div className={styles.divName}>
          <p className={styles.pName}>Введите ссылку на сервер дискорда</p>
          <input
            className={styles.inpName}
            value={newDiscordData?.discordLink}
            onChange={(e) =>
              setNewDiscordData((prev) => ({
                ...prev,
                discordLink: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles.divDiscordGuildId}>
          <p className={styles.pDiscordGuildId}>
            Введите полученный ID гильдии
          </p>
          <input
            className={styles.inpDiscordGuildId}
            value={newDiscordData?.discordGuildId}
            onChange={(e) =>
              setNewDiscordData((prev) => ({
                ...prev,
                discordGuildId: e.target.value,
              }))
            }
          />
        </div>
        <div className={styles.editBtns}>
          <button
            className={styles.save}
            onClick={() =>
              newDiscordData?.discordLink == "" ? setErr(true) : onSave()
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
