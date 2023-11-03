import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  token: null,
};

export const adminLogin = createAsyncThunk(
  "adminLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/login", data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    setLogout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
