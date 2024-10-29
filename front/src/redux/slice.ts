import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import classifyService from "../services/service";

interface Question {
	question: string;
	options: string[];
}

interface ClassifyState {
	industry: string;
	questions: Question[];
	loading: boolean;
	error: string | null;
}

const initialState: ClassifyState = {
	industry: "",
	questions: [],
	loading: false,
	error: null,
};

export const classifyURL = createAsyncThunk(
	"classify/classifyURL",
	async (url: string, { rejectWithValue }) => {
		try {
			const response = await classifyService.classify(url);
			return response.data;
		} catch (error) {
			return rejectWithValue("Failed to classify the URL");
		}
	},
);

const classifySlice = createSlice({
	name: "classify",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(classifyURL.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				classifyURL.fulfilled,
				(
					state,
					action: PayloadAction<{
						industry: string;
						questions: Question[];
					}>,
				) => {
					state.loading = false;
					state.industry = action.payload.industry;
					state.questions = action.payload.questions;
				},
			)
			.addCase(classifyURL.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default classifySlice.reducer;
