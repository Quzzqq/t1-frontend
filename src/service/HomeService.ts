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

export const checkInvites = async (userId: number) => {
  try {
    const response = await instance.get(
      `/api/invitations/user/${userId}/incoming`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const acceptInvite = async (idInvitation) => {
  try {
    const response = await instance.post(
      `/api/invitations/${idInvitation}/approve`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const declineInvite = async (idInvitation) => {
  try {
    const response = await instance.delete(
      `/api/invitations/${idInvitation}/decline`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const takeTeamFromFind = async (data) => {
  try {
    const response = await instance.get(`/api/teams?prefix=${data}&amount=3`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
