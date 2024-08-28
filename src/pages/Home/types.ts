export interface ISignIn {
  username: string;
  password: string;
}

export interface ISignUp {
  username: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
}

export interface IToken {
  accessToken: string;
}

export interface ITeams {
  [
    id: number,
    teamName: string,
    userCount: number,
    adminEmail: string,
    adminName: string,
  ];
}
