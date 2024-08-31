import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TeamAddForm.module.css";
import ReactSelect from "react-select";
import { valueKnowledgeOptions } from "../options";
import { ICompetence, IFindData, ISpecializationos } from "../../types";
import {
  takeCompetency,
  takeSpecialization,
  takeSuitableMember,
} from "../../../../service/teamService";

const opt = [
  { value: "fas", label: "fas" },
  { value: "saf", label: "saf" },
];

export default function TeamAddForm({ setActiveForm }) {
  const [dataSpecializations, setDataSpecializations] = useState<
    ISpecializationos[]
  >([
    { specializationId: 1, specializationName: "Системный аналитик" },
    { specializationId: 2, specializationName: "Бизнес аналитик" },
  ]);
  const [dataCompetence, setDataCompetence] = useState<ICompetence[]>([
    { competencyName: "Английский язык" },
    { competencyName: "Школа" },
  ]);
  const teamId = useParams().id;
  const [specialization, setSpecialization] = useState<string>("");
  const [competence, setCompetence] = useState<string>("");
  const [newData, setNewData] = useState<IFindData>({
    specializationName: "",
    competency: [],
  });
  const areaRef = useRef(null);

  const handleAddCompetency = () => {
    setNewData((prev) => ({
      ...prev,
      competency: [
        ...prev.competency,
        {
          id: newData.competency.length,
          competencyName: "",
          teoryLevel: null,
          practicalLevel: null,
        },
      ],
    }));
  };

  const onSave = async () => {
    try {
      const response = await takeSuitableMember(newData);
      setActiveForm(false);
      alert(
        response
          ? `Все подходящие пользователи: ${response}`
          : "Нет подходищих кандидатов!"
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = () => {
    setActiveForm(false);
  };
  const handleGiveSpecialization = async (value) => {
    setNewData((prev) => ({
      specializationName: value,
      competency: [
        ...prev.competency,
        {
          id: newData.competency.length,
          competencyName: "",
          teoryLevel: null,
          practicalLevel: null,
        },
      ],
    }));
    const response = await takeCompetency(value);
    setDataCompetence(response);
  };

  useEffect(() => {
    const takeSpec = async () => {
      const response = await takeSpecialization();
      setDataSpecializations(response);
    };
    takeSpec();
  }, []);

  // const takeComp = async () => {
  //   console.log(newData.specializationName);
  //   const response = await takeCompetency(newData.specializationName);
  //   setDataSpecializations(response);
  // };

  useEffect(() => {
    if (
      newData.competency.at(-1)?.teoryLevel !== null &&
      newData.competency.at(-1)?.practicalLevel !== null &&
      newData.competency.at(-1)?.competencyName !== null &&
      newData.specializationName
    ) {
      handleAddCompetency();
    }
  }, [newData]);

  useEffect(() => {
    const area = areaRef.current;
    if (area) {
      if (area.scrollHeight > area.clientHeight) {
        area.style.overflowY = "scroll";
      } else {
        area.style.overflowY = "hidden";
      }
    }
  }, [newData.competency]);
  // console.log(newData);
  return (
    <div className={styles.background}>
      {/* <button onClick={handleAddCompetency}>Add Competency</button> */}
      <div className={styles.block}>
        <h2 className={styles.blockH}>Найти подходящего кандидата</h2>
        <div className={styles.specializationArea}>
          <h3 className={styles.specializationH}>Специализация</h3>
          <ReactSelect
            placeholder="Введите команду"
            options={dataSpecializations.map((item) => ({
              value: item.specializationName,
              label: item.specializationName,
            }))}
            isSearchable={false}
            className={styles.findSpecialization}
            isDisabled={newData.specializationName == "" ? false : true}
            onChange={(selectedOpt) => {
              handleGiveSpecialization(selectedOpt?.value);
              // takeComp();
            }}
            maxMenuHeight={130}
          />
        </div>
        <div
          className={styles.areaUnderCompetence}
          ref={areaRef}
          //   onScroll={handleScroll}
        >
          {newData.competency.length !== 0 &&
            newData.competency.map((data) => (
              <div className={styles.area}>
                <div className={styles.competenceArea}>
                  <h3 className={styles.competenceH}>
                    <br />
                    Компетенция
                  </h3>
                  <ReactSelect
                    isSearchable={false}
                    options={dataCompetence.map((item) => ({
                      value: item.competencyName,
                      label: item.competencyName,
                    }))}
                    className={styles.findCompetence}
                    onChange={(selectedOpt) => {
                      setNewData((prev) => {
                        const updatedCompetency = [...prev.competency];
                        const index = updatedCompetency.findIndex(
                          (item) => item.id === data.id
                        );
                        if (index !== -1) {
                          updatedCompetency[index].competencyName =
                            selectedOpt.value;
                        }
                        return { ...prev, competency: updatedCompetency };
                      });
                    }}
                    maxMenuHeight={130}
                  />
                </div>
                <div className={styles.knowledgeArea}>
                  <h3 className={styles.knowledgeH}>
                    Теоретический
                    <br /> уровень
                  </h3>
                  <ReactSelect
                    placeholder="уровень"
                    options={valueKnowledgeOptions}
                    className={styles.findKnowledge}
                    isSearchable={false}
                    maxMenuHeight={130}
                    onChange={(selectedOpt) => {
                      setNewData((prev) => {
                        const updatedCompetency = [...prev.competency];
                        const index = updatedCompetency.findIndex(
                          (item) => item.id === data.id
                        );
                        if (index !== -1) {
                          updatedCompetency[index].teoryLevel =
                            selectedOpt.value;
                        }
                        return { ...prev, competency: updatedCompetency };
                      });
                    }}
                  />
                </div>
                <div className={styles.knowledgeArea}>
                  <h3 className={styles.knowledgeH}>
                    Практический
                    <br /> уровень
                  </h3>
                  <ReactSelect
                    placeholder="уровень"
                    options={valueKnowledgeOptions}
                    isSearchable={false}
                    className={styles.findKnowledge}
                    onChange={(selectedOpt) => {
                      setNewData((prev) => {
                        const updatedCompetency = [...prev.competency];
                        const index = updatedCompetency.findIndex(
                          (item) => item.id === data.id
                        );
                        if (index !== -1) {
                          updatedCompetency[index].practicalLevel =
                            selectedOpt.value;
                        }
                        return { ...prev, competency: updatedCompetency };
                      });
                    }}
                    maxMenuHeight={130}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className={styles.editBtns}>
          <button className={styles.save} onClick={onSave}>
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
