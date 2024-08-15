import { ILoginRequest, ILoginResponse } from "./types";
import { axiosInstance } from "../instance";
import Enpoints from "../endpoints";
import { AxiosPromise } from "axios";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Enpoints.AUTH.LOGIN, params);
