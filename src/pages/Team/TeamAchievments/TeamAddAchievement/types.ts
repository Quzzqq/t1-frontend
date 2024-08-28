import { ITeamCreate } from "../../../Home/TeamAdd/types";
import { ITeamAchievements } from "../../types";

export interface IAchievementAdd {
  achievementName: string;
  description: string;
}

export interface ITeamAddProps {
  setShowForm: (show: boolean) => void; // Тип для setShowForm
  setData: React.Dispatch<React.SetStateAction<ITeamCreate | undefined>>; // Тип для setData
  data: ITeamAchievements;
}
