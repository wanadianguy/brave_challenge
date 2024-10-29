import { configureStore } from "@reduxjs/toolkit";
import classifyReducer from "./slice";

export const store = configureStore({
	reducer: {
		classify: classifyReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
