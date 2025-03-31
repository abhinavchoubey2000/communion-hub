import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import { useEffect } from "react";
import ListEventsPage from "./components/pages/ListEventsPage";
import AddEventPage from "./components/pages/AddEventPage";
import { useDispatch } from "react-redux";
import { storeEvents } from "./redux/event-slice";
import { eventsMockData } from "./data/eventsMockData";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(storeEvents(eventsMockData));
	}, [dispatch]);
  
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/events" element={<ListEventsPage />} />
				<Route path="/events/add" element={<AddEventPage />} />
			</Routes>
		</Router>
	);
}

export default App;
