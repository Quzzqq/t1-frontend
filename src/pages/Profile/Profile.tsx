import { useState } from "react";
import styles from "./Profile.module.css";
import avatar from "../../components/img/avatar.png";
import edit from "../../components/img/edit.png";
import { IAddInfo } from "../Home/types";

const AddInfo = ({ header, text, name }: IAddInfo) => {
  return (
    <>
      <h4 className={styles.header}>{header}</h4>
      <textarea name={name} className={styles.area}>
        {text}
      </textarea>
    </>
  );
};

export default function Profile() {
  const [activeEdit, setActiveEdit] = useState(false);

  return (
    <>
      <div className={styles.back}>
        <div className={styles.initials}>
          <img src={avatar} alt="avatar" className={styles.imgAvatar} />
          {activeEdit ? (
            <div className={styles.initialsInpDiv}>
              <input type="text" name="name" className={styles.initialsInp} />
              <input
                type="text"
                name="surname"
                className={styles.initialsInp}
              />
              <input
                type="text"
                name="patronymic"
                className={styles.initialsInp}
              />
            </div>
          ) : (
            <div className={styles.initialsTextDiv}>
              <p className={styles.initialsText}>Имя</p>
              <p className={styles.initialsText}>Фамилия</p>
              <p className={styles.initialsText}>Отчество</p>
            </div>
          )}
        </div>
        <div className={styles.infoAbout}>
          <h4 className={styles.headerAbout}>О себе</h4>
          <textarea name="aboutMe" className={styles.areaAbout}>
            Я проживаю там-то там-то Люблю то-то то-то Ищу с кем выпить
          </textarea>
        </div>
        <div className={styles.infoPost}>
          <AddInfo
            header={"Должность"}
            text={"Frontend-developer"}
            name={"post"}
          />
        </div>
        <div className={styles.infoExp}>
          <AddInfo
            header={"Опыт"}
            text={"Yandex - 1.5 года Google - 5 лет"}
            name={"expirience"}
          />
        </div>
        <div className={styles.infoSkills}>
          <AddInfo
            header={"Навыки"}
            text={"Песнопение, коммуникация, работа в команде, балет"}
            name={"skills"}
          />
        </div>
        <button className={styles.imgEditBtn}>
          <img src={edit} alt="edit" className={styles.imgEdit} />
        </button>
      </div>
    </>
  );
}
