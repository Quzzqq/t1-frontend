import styles from "./TeamMain.module.css";
import ownerStar from "../../../components/img/ownerStar.png";
import add from "../../../components/img/add.png";
import deleteImg from "../../../components/img/delete.png";
import { useEffect, useRef, useState } from "react";
import {
  addUserInTeam,
  deleteTeam,
  deleteTeamMember,
  putTeamMainInfo,
  takeTeamMain,
} from "../../../service/teamService";
import { useNavigate, useParams } from "react-router-dom";
import { IAdmin, IDataForAdd, ITeamMain } from "../types";
import { useSelector } from "react-redux";
import TeamAddForm from "./TeamAddForm/TeamAddForm";

export default function TeamMain({ admin }: IAdmin) {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const userId = useSelector((state) =>
    state.auth.data ? state.auth.data.userId : null
  );
  const [choise, setChoise] = useState("main");
  const [data, setData] = useState<ITeamMain>();
  const [activeForm, setActiveForm] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [tempData, setTempData] = useState();
  const [activeEdit, setActiveEdit] = useState(false);
  const membersAreaRef = useRef(null);
  const [dataForAdd, setDataForAdd] = useState<IDataForAdd>({});
  const handleScroll = () => {
    const membersArea = membersAreaRef.current;
    if (membersArea.scrollHeight > membersArea.clientHeight) {
      membersArea.style.overflowY = "scroll";
    } else {
      membersArea.style.overflowY = "hidden";
    }
  };
  const onSave = async () => {
    await putTeamMainInfo(id, data);
    setActiveEdit(false);
    setTempData(data);
  };

  const onCancel = () => {
    setData(tempData);
    setActiveEdit(false);
  };

  const addUser = async () => {
    try {
      await addUserInTeam(dataForAdd);
      alert("Заявка отправлена!");
    } catch (err) {
      console.log(err);
      alert("Неверная почта");
    }
  };

  const handleDeleteMember = async (userId) => {
    try {
      if (window.confirm("Вы действительно хотите удалить пользователя?")) {
        await deleteTeamMember(id, userId);
        const updatedUsers = data.users.filter((item) => item.id != userId);
        setData((prev) => ({
          ...prev,
          users: updatedUsers,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTeam = async () => {
    try {
      if (
        window.confirm(
          "Вы действительно хотите удалить команду? Команду нельзя будет вернуть!"
        )
      ) {
        await deleteTeam(id);
        navigate("/");
      }
    } catch (err) {
      window.confirm("Произошла ошибка!");
      console.log(err);
    }
  };

  useEffect(() => {
    const takeResponse = async () => {
      const response = await takeTeamMain(id);
      setData(response);
    };
    takeResponse();
    setTempData(data);
  }, [id]);
  useEffect(() => {
    setDataForAdd({
      text: "Вступайте в команду!",
      userSenderId: userId,
      userReceiverMail: "",
      team: id,
    });
  }, [userId]);
  return (
    <>
      {activeForm && <TeamAddForm setActiveForm={setActiveForm} />}
      <div className={styles.all}>
        <div className={styles.descriptionArea}>
          <h4 className={styles.descriptionName}>Описание</h4>
          <textarea
            className={styles.descriptionText}
            name="descriptionText"
            value={data?.description}
            readOnly={!admin}
            onChange={(e) => {
              setActiveEdit(true);
              setData((prev) => ({ ...prev, description: e.target.value }));
            }}
          />
        </div>
        <div className={styles.rightArea}>
          <div
            className={styles.membersArea}
            ref={membersAreaRef}
            onScroll={handleScroll}
          >
            <div className={styles.memberInArea}>
              <h4 className={styles.membersName}>Участники</h4>
              <div className={styles.memberPeoples}>
                {data &&
                  Object.values(data?.users).map((people) => (
                    <div
                      key={people.id}
                      style={{ background: "none" }}
                      className={styles.peopleDiv}
                      onClick={() => navigate(`/user/${people.id}`)}
                    >
                      <p key={people.name} className={styles.name}>
                        {people.teamRole == "OWNER" && (
                          <button className={styles.ownerBtn}>
                            <img
                              src={ownerStar}
                              alt="OWNER"
                              className={styles.ownerImg}
                            />
                          </button>
                        )}
                        {people.name}
                        {people.teamRole !== "OWNER" && (
                          <button
                            style={admin ? {} : { display: "none" }}
                            className={styles.deleteBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMember(people.id);
                            }}
                          >
                            <img
                              src={deleteImg}
                              alt="delete"
                              className={styles.deleteImg}
                            />
                          </button>
                        )}
                      </p>
                    </div>
                  ))}
              </div>
              <div className={styles.roll}></div>
            </div>
          </div>
          {admin && (
            <div className={styles.addArea}>
              <h5 className={styles.addName}>Добавить участника</h5>
              <input
                type="email"
                className={styles.addInp}
                placeholder="Введите e-mail"
                value={dataForAdd.userReceiverMail}
                onChange={(e) =>
                  setDataForAdd((prev) => ({
                    ...prev,
                    userReceiverMail: e.target.value,
                  }))
                }
              />

              <button className={styles.addBtn} onClick={addUser}>
                <img src={add} alt="add" className={styles.addImg} />
              </button>
            </div>
          )}
          {admin && (
            <button
              className={styles.findPeople}
              onClick={() => setActiveForm(true)}
            >
              Найти подходящего члена
            </button>
          )}

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
        {admin && (
          <button className={styles.deleteTeam} onClick={handleDeleteTeam}>
            Удалить Команду
          </button>
        )}
      </div>
    </>
  );
}
