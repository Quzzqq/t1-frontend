import { useEffect, useState } from "react";
import styles from "./Team.module.css";
import TeamMain from "./TeamMain/TeamMain";
import TeamAchievments from "./TeamAchievments/TeamAchievments";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkMember,
  takeDiscordData,
  takeIdAdmin,
  takeNameTeam,
} from "../../service/teamService";
import TeamChannel from "./TeamChannels/TeamChannels";
import { useSelector } from "react-redux";
import discordPng from "../../components/img/discord.png";
import TeamDiscordForm from "./TeamDiscordForm/TeamDiscordForm";
import { IDiscordData } from "./types";
import { Alert } from "@mui/material";

export default function Team() {
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [choise, setChoise] = useState("main");
  const [name, setName] = useState("");
  const [idAdmin, setIdAdmin] = useState<number>();
  const groupId = useParams().id;
  const [activeForm, setActiveForm] = useState(false);
  const [isTeamMember, setIsTeamMember] = useState(false);
  const [discordData, setDiscordData] = useState<IDiscordData>();

  const userId = useSelector((state) =>
    state.auth.data ? state.auth.data.userId : null
  );
  const [admin, setAdmin] = useState<boolean>(false);
  useEffect(() => {
    const responses = async () => {
      try {
        const response = await takeNameTeam(groupId);
        const responseIdAdmin = await takeIdAdmin(groupId);
        const responseDiscordData = await takeDiscordData(groupId);
        setName(response);
        setIdAdmin(responseIdAdmin);
        setDiscordData(responseDiscordData);
      } catch (err) {
        alert("Данной команды не существует");
        navigate("/");
      }
    };
    responses();
  }, [groupId]);
  useEffect(() => {
    setAdmin(idAdmin === userId);
  }, [idAdmin, userId]);
  useEffect(() => {
    const responses = async () => {
      const response = await checkMember(groupId, userId);
      setIsTeamMember(response);
    };
    responses();
  }, [userId, groupId]);
  useEffect(() => {
    let timeoutId;
    if (showErrorAlert) {
      timeoutId = setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000); // Скрываем Alert через 3 секунды
    }
    return () => clearTimeout(timeoutId);
  }, [showErrorAlert]);
  return (
    <>
      {showErrorAlert &&
        (isTeamMember ? (
          <Alert severity="error" className="alert">
            Админ не добавил ссылку на дискорд!
          </Alert>
        ) : (
          <Alert severity="error" className="alert">
            Для доступа вы должны быть в команде!
          </Alert>
        ))}
      {activeForm && (
        <TeamDiscordForm
          setActiveForm={setActiveForm}
          discordData={discordData}
          setDiscordData={setDiscordData}
        />
      )}
      <div className={styles.back}>
        <div className={styles.header}>
          <h3 className={styles.teamName}>{name}</h3>
          <button
            className={styles.discordBtn}
            onClick={() =>
              admin
                ? setActiveForm(true)
                : discordData?.discordLink
                ? window.open(discordData?.discordLink, "_blank")
                : setShowErrorAlert(true)
            }
          >
            <img src={discordPng} alt="discord" className={styles.discordPng} />
          </button>
          <div className={styles.btns}>
            <button
              className={styles.btn}
              style={choise == "main" ? { background: "rgb(157 255 140)" } : {}}
              onClick={() => setChoise("main")}
            >
              Главная
            </button>
            <button
              className={styles.btn}
              style={
                choise == "achievements"
                  ? { background: "rgb(157 255 140)" }
                  : {}
              }
              onClick={() => setChoise("achievements")}
            >
              Достижения
            </button>
            {isTeamMember && (
              <button
                className={styles.btn}
                style={
                  choise == "channels" ? { background: "rgb(157 255 140)" } : {}
                }
                onClick={() => setChoise("channels")}
              >
                Каналы
              </button>
            )}
          </div>
        </div>
        {choise == "main" && <TeamMain name={name} admin={admin} />}
        {choise == "achievements" && <TeamAchievments admin={admin} />}
        {choise == "channels" && <TeamChannel admin={admin} />}
      </div>
    </>
  );
}
