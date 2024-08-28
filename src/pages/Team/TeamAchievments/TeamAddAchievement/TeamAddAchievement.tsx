import { useState } from "react";
import styles from "./TeamAddAchievement.module.css";
import { IAchievementAdd } from "./types";
import { ITeamAddProps } from "./types";
import {
  addTeamAchievement,
  takeTeamAchievements,
} from "../../../../service/teamService";
import { useParams } from "react-router-dom";

export default function TeamAddAchievement({
  setShowForm,
  setData,
  data,
}: ITeamAddProps) {
  const teamId = useParams().id;
  const [err, setErr] = useState(false);

  const [newTeamData, setNewTeamData] = useState<IAchievementAdd>({
    achievementName: "",
    description: "",
  });
  const onSave = async () => {
    try {
      const response = await addTeamAchievement(teamId, newTeamData);
      setData((prev) => (prev.length === 0 ? [response] : [...prev, response]));
      setShowForm(false);
      setErr(false);
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
        <h2 className={styles.tag}>Добавление достижения</h2>
        <div className={styles.divName}>
          <p className={styles.pName}>Введите название достижения</p>
          <input
            className={styles.inpName}
            value={newTeamData?.teamName}
            onChange={(e) =>
              setNewTeamData((prev) => ({
                ...prev,
                achievementName: e.target.value,
              }))
            }
          />
          {err && <p className={styles.err}>Обязательное поле</p>}
        </div>
        <div className={styles.divDescription}>
          <p className={styles.pDescription}>Введите описание достижения</p>
          <input
            className={styles.inpDescription}
            value={newTeamData?.description}
            onChange={(e) =>
              setNewTeamData((prev) => ({
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
              newTeamData?.achievementName == "" ? setErr(true) : onSave()
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
