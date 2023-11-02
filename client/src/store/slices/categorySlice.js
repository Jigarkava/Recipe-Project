import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

let initialState = {
  allCategoryData: [],
  isLoading: true,
  getDataByID: [],
  status: false,
};

export const createCategory = createAsyncThunk(
  "createCategory",
  async (dispatch, { rejectWithValue }) => {
    try {
      const response = await api.post("/category", dispatch);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategoryData = createAsyncThunk(
  "getCategoryData",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await api.get("/category", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategoryData = createAsyncThunk(
  "updateCategoryData",
  async ({ data, _id }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/category/${_id}`, data);
      console.log(response.data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategoryData = createAsyncThunk(
  "deleteCategoryData",
  async (_id, { rejectWithValue }) => {
    console.log(_id);
    try {
      const response = await api.delete(`/category/${_id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategoryDataById = createAsyncThunk(
  "getCategoryDataById",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/category/getCategory`, {
        params: { _id },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categoryData",
  initialState,
  extraReducers: (builder) => {
    // !getCategoryData
    builder.addCase(getCategoryData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCategoryData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allCategoryData = action.payload;
    });
    // ! GetCategoryDataById
    builder.addCase(getCategoryDataById.pending, (state) => {
      state.status = true;
    });

    builder.addCase(getCategoryDataById.fulfilled, (state, action) => {
      state.status = false;
      state.getDataByID = action.payload;
    });
  },
});

export default categorySlice.reducer;
