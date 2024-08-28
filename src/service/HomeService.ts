import instance from "../axios/axios";

export const takeRandomTeams = async () => {
  try {
    const response = await instance.get("/api/teams/random?amount=3");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createTeam = async (userId, data) => {
  try {
    const response = await instance.post(`/api/teams/user/${userId}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
