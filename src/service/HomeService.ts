import instance from "../axios/axios";

export const takeRandomTeams = async () => {
  try {
    const response = await instance.get("/api/teams/random");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
