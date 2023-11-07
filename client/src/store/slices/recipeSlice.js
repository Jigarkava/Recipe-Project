import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

let initialState = {
  allRecipeData: [],
  isLoading: true,
  recipeBySlug: null,
  recipeDataById: [],
  status: false,
  count: 0,
};

export const createRecipe = createAsyncThunk(
  "createRecipe",
  async (dispatch, { rejectWithValue }) => {
    try {
      const response = await api.post("/recipe", dispatch);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRecipeData = createAsyncThunk(
  "getRecipeData",
  async (payload, { rejectWithValue }) => {
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
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await api.delete(`/recipe/${_id}`);
      return _id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateRecipeData = createAsyncThunk(
  "updateRecipeData",
  async ({ data, _id }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/recipe/${_id}`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRecipeById = createAsyncThunk(
  "getRecipeById",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/recipe/${_id}`);
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
  extraReducers: (builder) => {
    // ! CreateRecipeData
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      state.allRecipeData = [action.payload.recipe, ...state.allRecipeData];
      state.count = state.count + 1;
    });

    // ! DeleteRecipeData
    builder.addCase(deleteRecipeData.fulfilled, (state, action) => {
      state.allRecipeData = state.allRecipeData.filter(
        (recipe) => recipe._id !== action.payload
      );
      state.count = state.count - 1;
    });

    // ! EditCategoryData
    builder.addCase(updateRecipeData.fulfilled, (state, action) => {
      state.allRecipeData = state.allRecipeData.map((recipe) => {
        if (recipe._id === action.payload.recipe._id) {
          return action.payload.recipe;
        } else {
          return recipe;
        }
      });
    });

    // ! getRecipeData
    builder.addCase(getRecipeData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipeData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allRecipeData = action.payload.recipes;
      state.count =
        action?.payload?.count[0]?.count || action.payload.recipes.length;
    });
    builder.addCase(getRecipeData.rejected, (state) => {
      state.isLoading = false;
      state.allRecipeData = [];
      state.count = 0;
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
