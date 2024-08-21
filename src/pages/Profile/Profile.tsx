import { useState } from "react";
import styles from "./Profile.module.css";
export default function Profile() {
  const [activeEdit, setActiveEdit] = useState(false);

  const addInfo = (header: string, text: string, name: string) => {
    return (
      <div className={styles.info}>
        <h4 className={styles.header}></h4>
        <textarea name={name}>{text}</textarea>
      </div>
    );
  };

  return (
    <>
      <div className={styles.back}>
        <div className={styles.initials}>
          <img src="avatar.png" alt="avatar" />
          {activeEdit ? (
            <div>
              <input type="text" name="name" />
              <input type="text" name="surname" />
              <input type="text" name="patronymic" />
            </div>
          ) : (
            <div>
              <p>Имя</p>
              <p>Фамилия</p>
              <p>Отчество</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
