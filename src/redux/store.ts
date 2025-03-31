import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./event-slice";
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
	reducer: {
		Event: eventSlice,
	},
});

export default store;
