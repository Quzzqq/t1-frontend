import instance from "../axios/axios";
import { IData } from "../pages/Profile/types";

export const profileTake = async (id: number) => {
  try {
    const response = await instance.get(`/api/users/${id}`);
    if (!response) {
      return "403";
    }
    return response.data;
  } catch (err) {
    console.log(err, "123");
  }
};

export const profileSave = async (data: IData) => {
  try {
    const response = await instance.patch(`/api/users/${data.id}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
