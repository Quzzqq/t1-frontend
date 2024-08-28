import { useState } from "react";
import styles from "./TeamAdd.module.css";
import { ITeamCreate } from "./types";
import { createTeam } from "../../../service/HomeService";
import { useNavigate } from "react-router-dom";

export default function TeamAdd({ userId, setShowForm }) {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [data, setData] = useState<ITeamCreate>({
    teamName: "",
    description: "",
  });
  const onSave = async () => {
    try {
      const response = await createTeam(userId, data);
      setShowForm(false);
      setErr(false);
      navigate(`/team/${response.id}`);
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
        <h2 className={styles.tag}>Создание команды</h2>
        <div className={styles.divName}>
          <p className={styles.pName}>Введите название команды</p>
          <input
            className={styles.inpName}
            value={data?.teamName}
            onChange={(e) =>
              setData((prev) => ({ ...prev, teamName: e.target.value }))
            }
          />
          {err && <p className={styles.err}>Обязательное поле</p>}
        </div>
        <div className={styles.divDescription}>
          <p className={styles.pDescription}>Введите описание команды</p>
          <input
            className={styles.inpDescription}
            value={data?.description}
            onChange={(e) =>
              setData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div className={styles.editBtns}>
          <button
            className={styles.save}
            onClick={() => (data?.teamName == "" ? setErr(true) : onSave())}
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
