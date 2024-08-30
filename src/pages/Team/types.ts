export interface ITeamMain {
  description: string;
  telegramLink: string;
  users: [
    {
      id: number;
      username: string;
      name: string;
      surname: string;
      patronymic: string;
      responsibilityArea: string;
      teamRole: string;
    }
  ];
}

export interface ITeamAchievements {
  id: number;
  achievementName: string;
  description: string;
}

export interface IDataForAdd {
  text: string;
  userSenderId: number;
  userReceiverMail: string;
  team: number;
}

export interface IAdmin {
  admin: boolean;
}

export interface IDiscordData {
  discordLink: string;
  discordGuildId: string;
}

export interface ISpecializationos {
  specializationId: number;
  specializationName: string;
}

export interface ICompetence {
  competencyName: string;
}

export interface IFindData {
  specializationName: string;
  competency: [
    {
      id: number;
      competencyName: string;
      theoreticalExperience: number;
      practicalExperience: number;
    }
  ];
}
