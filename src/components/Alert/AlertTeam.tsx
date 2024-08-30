import { Alert } from "@mui/material";

export const AlertTeamNotFound = () => {
  return (
    <Alert severity="error" className="alert">
      Данной команды не существует!
    </Alert>
  );
};

export const AlertTeamHaventDiscord = () => {
  return (
    <Alert severity="error" className="alert">
      Админ не добавил ссылку на дискорд!
    </Alert>
  );
};

export const AlertTeamDiscordIsEmpty = () => {
  return (
    <Alert severity="error" className="alert">
      Админ не добавил ссылку на дискорд!
    </Alert>
  );
};
