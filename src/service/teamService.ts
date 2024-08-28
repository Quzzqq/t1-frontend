import instance from "../axios/axios";

export const takeNameTeam = async (id) => {
  try {
    const response = await instance.get(`/api/teams/${id}/name`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const takeTeamMain = async (id) => {
  try {
    const response = await instance.get(`/api/teams/${id}/users`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const putTeamMainInfo = async (id, data) => {
  try {
    await instance.put(`/api/teams/${id}`, data);
  } catch (e) {
    console.log(e);
  }
};

export const takeTeamAchievements = async (id) => {
  try {
    const response = await instance.get(`/api/achievements/team/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const putTeamAchievement = async (id) => {
  try {
    const response = await instance.get(`/api/achievements/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const addTeamAchievement = async (teamId, data) => {
  try {
    const response = await instance.post(
      `/api/achievements/team/${teamId}`,
      data
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTeamAchievement = async (channelId) => {
  try {
    const response = await instance.delete(`/api/achievements/${channelId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
