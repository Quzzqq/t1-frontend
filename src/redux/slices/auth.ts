import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { ISignIn, ISignUp } from "../../pages/Home/types";
import { IState } from "./types";

export const fetchAuth = createAsyncThunk<ISignIn, ISignIn>(
  "auth/fetchAuth",
  async (params) => {
    try {
      const response = await axios.post("/api/auth/login", params, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      if (err.response.status) alert("Неверный логин или пароль");
      console.log(err);
    }
  }
);

export const fetchRegister = createAsyncThunk<ISignUp, ISignUp>(
  "auth/fetchRegister",
  async (params) => {
    try {
      const response = await axios.post("/api/auth/register", params, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      if (err.response.status) alert("Пользователь с таким логином уже есть");
      console.log(err);
    }
  }
);

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (err) {
    if (err.response.status) alert("Ошибка");
    console.log(err);
  }
});

export const fetchRefresh = createAsyncThunk("auth/fetchRefresh", async () => {
  try {
    const response = await axios.get("/api/auth/refresh");
    return response.data;
  } catch (err) {
    if (err.response.status) alert("Ошибка");
    console.log(err);
  }
});

export const fetchAuthMe = createAsyncThunk<ISignIn>(
  "auth/fetchAuthMe",
  async () => {
    const { data } = await axios.get("/api/auth");
    return data;
  }
);

const initialState: IState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const authReducer = authSlice.reducer;
export const selectIsAuth = (state: any) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;
