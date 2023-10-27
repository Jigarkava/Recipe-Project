import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { toast } from "react-toastify";

let initialState = {
  allCategoryData: [],
  isLoading: false,
};

export const createCategory = createAsyncThunk(
  "createCategory",
  async (dispatch) => {
    try {
      const response = await api.post("/category", dispatch);
      toast.success("Category Created Successfully1");
      return response;
    } catch (error) {
      toast.error("Something Went Wrong");
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCategoryData = createAsyncThunk(
  "updateCategoryData",
  async ({ data, _id }, { rejectWithValue }) => {
    console.log(data);
    console.log(_id);
    try {
      const response = await api.put(`/category/${_id}`, data);
      console.log(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categoryData",
  initialState,
  //   reducers: {
  //     addApplicantData: (state, action) => {
  //       state.applicant = action.payload;
  //     },

  //     addDependentsData: (state, action) => {
  //       const { aadharNumber } = action.payload;
  //       action.payload.aadharNumber = parseInt(aadharNumber);
  //       state.dependents.push(action.payload);
  //     },

  //     editDependentData: (state, action) => {
  //       const { dependentId, updatedData } = action.payload;

  //       console.log(dependentId, updatedData);

  //       updatedData.aadharNumber = parseInt(updatedData.aadharNumber);

  //       const index = state.dependents.findIndex(
  //         (dependent) => dependent.dependentId === updatedData.dependentId
  //       );

  //       if (
  //         index !== undefined &&
  //         index >= 0 &&
  //         index < state.dependents.length
  //       ) {
  //         state.dependents[index] = {
  //           ...state.dependents[index],
  //           ...updatedData,
  //         };
  //       }
  //     },

  //     deleteDependent: (state, action) => {
  //       const dependentId = action.payload;
  //       state.dependents = state.dependents.filter(
  //         (dependent) => dependent.dependentId !== dependentId
  //       );
  //     },

  //     clearAllData: (state) => {
  //       state.applicant = {};
  //       state.dependents = [];
  //       console.log("clear success");
  //     },
  //   },
  extraReducers: (builder) => {
    builder.addCase(getCategoryData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCategoryData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allCategoryData = action.payload;
    });
  },
});

export const {
  addApplicantData,
  addDependentsData,
  editDependentData,
  deleteDependent,
  proceedAllData,
  clearAllData,
} = categorySlice.actions;

export default categorySlice.reducer;
