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
