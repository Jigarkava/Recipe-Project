import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

let initialState = {
  allCategoryData: [],
  count: 0,
  isLoading: false,
  getDataByID: [],
  status: false,
};
export const getCategoryData = createAsyncThunk(
  "getCategoryData",
  async (payload, { rejectWithValue }) => {
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
export const createCategory = createAsyncThunk(
  "createCategory",
  async (dispatch, { rejectWithValue }) => {
    try {
      const response = await api.post("/category", dispatch);
      console.log(response);
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategoryData = createAsyncThunk(
  "deleteCategoryData",
  async (_id, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await api.delete(`/category/${_id}`);
      return _id;
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
    // ! CreateCategoryData
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.allCategoryData = [
        action.payload.category,
        ...state.allCategoryData,
      ];
      state.count = state.count + 1;
    });

    // ! DeleteCategoryData
    builder.addCase(deleteCategoryData.fulfilled, (state, action) => {
      state.allCategoryData = state.allCategoryData.filter(
        (category) => category._id !== action.payload
      );
      state.count = state.count - 1;
    });

    // ! EditCategoryData
    builder.addCase(updateCategoryData.fulfilled, (state, action) => {
      state.allCategoryData = state.allCategoryData.map((category) => {
        if (category._id === action.payload.category._id) {
          return action.payload.category;
        } else {
          return category;
        }
      });
    });

    // !getCategoryData
    builder.addCase(getCategoryData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCategoryData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allCategoryData = action.payload.categories;
      state.count = action.payload.count;
    });

    builder.addCase(getCategoryData.rejected, (state) => {
      state.isLoading = false;
      state.allCategoryData = [];
      state.count = 0;
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
