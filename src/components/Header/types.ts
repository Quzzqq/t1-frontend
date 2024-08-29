export interface INotifications {
  id: number;
  text: string;
  userReceiver: {
    id: number;
    username: string;
    name: string;
    surname: string;
    patronymic: string;
  };
  userSender: {
    id: number;
    username: string;
    name: string;
    surname: string;
    patronymic: string;
  };
  team: {
    id: number;
    teamName: string;
    description: string;
    project: {
      id: number;
      projectName: string;
      projectLink: string;
      description: string;
    };
  };
}
