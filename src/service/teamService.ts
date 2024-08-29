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
    const response = await instance.get(`/api/teams/${id}/page`);
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

export const takeTeamChannels = async (teamId) => {
  try {
    const response = await instance.get(`/api/channels/team/${teamId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const takeChannelData = async (channelId) => {
  try {
    const response = await instance.get(`/api/channels/${channelId}/page`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const addTeamChannel = async (teamId, data) => {
  try {
    const response = await instance.post(`/api/channels/team/${teamId}`, data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const addUserInTeam = async (data) => {
  try {
    const response = await instance.post("/api/invitations/send", data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTeamChannel = async (channelId) => {
  try {
    const response = await instance.delete(`/api/channels/${channelId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const takeIdAdmin = async (teamId) => {
  try {
    const response = await instance.get(`/api/teams/${teamId}/admin`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
