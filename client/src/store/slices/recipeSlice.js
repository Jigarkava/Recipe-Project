import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { toast } from "react-toastify";

let initialState = {
  allRecipeData: [],
  isLoading: true,
  recipeBySlug: null,
  recipeDataById: [],
  status: false,
};

export const createRecipe = createAsyncThunk(
  "createRecipe",
  async (dispatch) => {
    try {
      const response = await api.post("/recipe", dispatch);
      toast.success("Recipe Created Successfully1");
      console.log(response);
      return response;
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
);

export const getRecipeData = createAsyncThunk(
  "getRecipeData",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await api.get("/recipe", {
        params: payload,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteRecipeData = createAsyncThunk(
  "deleteRecipeData",
  async (_id, { rejectWithValue }) => {
    console.log(_id);
    try {
      const response = await api.delete(`/recipe/${_id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateRecipeData = createAsyncThunk(
  "updateRecipeData",
  async ({ data, _id }, { rejectWithValue }) => {
    console.log(data);
    console.log(_id);
    try {
      const response = await api.put(`/recipe/${_id}`, data);
      console.log(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getRecipeById = createAsyncThunk(
  "getRecipeById",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/recipe/${_id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getRecipeBySlug = createAsyncThunk(
  "getRecipeBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/recipe/getRecipeBySlug/${slug}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipeData",
  initialState,
  //   reducers: {}
  extraReducers: (builder) => {
    // ! getRecipeData
    builder.addCase(getRecipeData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipeData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allRecipeData = action.payload;
    });
    builder.addCase(getRecipeData.rejected, (state) => {
      state.isLoading = false;
    });

    // ! getRecipeByslug
    builder.addCase(getRecipeBySlug.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipeBySlug.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recipeBySlug = action.payload;
    });
    builder.addCase(getRecipeBySlug.rejected, (state) => {
      state.isLoading = false;
    });

    // ! getRecipeById
    builder.addCase(getRecipeById.pending, (state) => {
      state.status = true;
    });
    builder.addCase(getRecipeById.fulfilled, (state, action) => {
      state.status = false;
      state.recipeDataById = action.payload;
    });
    builder.addCase(getRecipeById.rejected, (state) => {
      state.status = false;
    });
  },
});

export default recipeSlice.reducer;
