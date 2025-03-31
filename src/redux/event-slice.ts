import { EventInterface, InitialStateInterface } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateInterface = {
	events: [],
};

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		storeEvents: (state, action: PayloadAction<Array<EventInterface>>) => {
			state.events = action.payload;
		},
		addEvent: (state, action: PayloadAction<EventInterface>) => {
			state.events.push(action.payload);
		},
	},
});

export const { storeEvents, addEvent } = eventSlice.actions;
export default eventSlice.reducer;
