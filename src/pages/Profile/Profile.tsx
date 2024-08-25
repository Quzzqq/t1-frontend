import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import avatar from "../../components/img/avatar.png";
import edit from "../../components/img/edit.png";
import { useNavigate, useParams } from "react-router-dom";
import { profileSave, profileTake } from "../../service/profileService";
import { IData, IAddInfo } from "./types";
import { useSelector } from "react-redux";

const AddInfo = ({ header, text, name, onChange, readOnly }: IAddInfo) => {
  return (
    <>
      <h4 className={styles.header}>{header}</h4>
      <textarea
        name={name}
        className={styles.area}
        value={text}
        onChange={onChange}
        readOnly={readOnly}
      ></textarea>
    </>
  );
};

export default function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState<IData>();
  const [tempData, setTempData] = useState<IData>();
  const [activeEdit, setActiveEdit] = useState(false);
  const { id } = useParams();
  const readOnly = !(
    id == useSelector((state) => state.auth.data && state.auth.data.userId)
  );
  useEffect(() => {
    const fetchData = async () => {
      const response: IData = await profileTake(id);
      if (response == 403) {
        navigate("/");
        return;
      }
      setData(response);
      setTempData(response);
    };
    fetchData();
  }, [id]);

  const onChange = (e) => {
    setActiveEdit(true);
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async () => {
    await profileSave(data);
    setActiveEdit(false);
    setTempData(data);
  };

  const onCancel = () => {
    setData(tempData);
    setActiveEdit(false);
  };

  return (
    <>
      <div className={styles.back}>
        <div className={styles.initials}>
          <img src={avatar} alt="avatar" className={styles.imgAvatar} />
          <div className={styles.initialsTextDiv}>
            <h3 className={styles.fio}>ФИО</h3>
            <textarea
              type="text"
              name="name"
              className={styles.initialsText}
              value={data?.name}
              onChange={onChange}
              maxLength={12}
              readOnly={readOnly}
            />
            <textarea
              type="text"
              name="surname"
              value={data?.surname}
              className={styles.initialsText}
              onChange={onChange}
              maxLength={12}
              readOnly={readOnly}
            />
            <textarea
              type="text"
              name="patronymic"
              value={data?.patronymic}
              className={styles.initialsText}
              onChange={onChange}
              maxLength={12}
              readOnly={readOnly}
            />
          </div>
        </div>
        <div className={styles.infoAbout}>
          <h4 className={styles.headerAbout}>О себе</h4>
          <textarea
            name="about"
            className={styles.areaAbout}
            value={data?.about}
            onChange={onChange}
            readOnly={readOnly}
          ></textarea>
        </div>
        <div className={styles.infoPost}>
          <AddInfo
            header={"Должность"}
            text={data?.position}
            name={"position"}
            onChange={onChange}
            readOnly={readOnly}
          />
        </div>
        <div className={styles.infoExp}>
          <AddInfo
            header={"Опыт"}
            text={data?.workExperience}
            name={"workExperience"}
            onChange={onChange}
            readOnly={readOnly}
          />
        </div>
        <div className={styles.infoSkills}>
          <AddInfo
            header={"Навыки"}
            text={data?.skills}
            name={"skills"}
            onChange={onChange}
            readOnly={readOnly}
          />
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
