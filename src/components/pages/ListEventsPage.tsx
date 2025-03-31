import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { EventInterface } from "@/types/types";
import { useSelector } from "react-redux";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	CalendarIcon,
	MapPinIcon,
	PlusIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
import { format } from "date-fns";
import { RootState } from "@/redux/store";

const ITEMS_PER_PAGE = 6;

const ListEventsPage = () => {
	document.title = "Events | Communion Hub";
	const { events } = useSelector((state: RootState) => state.Event);
	const [filter, setFilter] = useState<
		"All" | "Religious" | "Social" | "Charity"
	>("All");
	const [currentPage, setCurrentPage] = useState(1);

	const filteredEvents =
		filter === "All"
			? events
			: events.filter((event) => event.category === filter);

	// Calculate pagination
	const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentEvents = filteredEvents.slice(startIndex, endIndex);

	const handleFilterChange = (
		newFilter: "All" | "Religious" | "Social" | "Charity"
	) => {
		setFilter(newFilter);
		setCurrentPage(1); // Reset to first page when filter changes
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<Layout>
			<div className="container mx-auto py-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">Community Events</h1>
					<Link to="/events/add">
						<Button className="flex items-center gap-2 bg-[#353535] hover:bg-[#515050] rounded-full">
							<PlusIcon className="h-4 w-4" />
							Add New Event
						</Button>
					</Link>
				</div>

				<div className="flex justify-center gap-4 mb-8">
					<Button
						className={`rounded-full ${
							filter === "All"
								? "bg-indigo-600 hover:bg-indigo-700"
								: "bg-transparent text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
						}`}
						onClick={() => handleFilterChange("All")}
					>
						All
					</Button>
					<Button
						className={`rounded-full ${
							filter === "Religious"
								? "bg-indigo-600 hover:bg-indigo-700"
								: "bg-transparent text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
						}`}
						onClick={() => handleFilterChange("Religious")}
					>
						Religious
					</Button>
					<Button
						className={`rounded-full ${
							filter === "Social"
								? "bg-indigo-600 hover:bg-indigo-700"
								: "bg-transparent text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
						}`}
						onClick={() => handleFilterChange("Social")}
					>
						Social
					</Button>
					<Button
						className={`rounded-full ${
							filter === "Charity"
								? "bg-indigo-600 hover:bg-indigo-700"
								: "bg-transparent text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
						}`}
						onClick={() => handleFilterChange("Charity")}
					>
						Charity
					</Button>
				</div>
				{totalPages > 1 && (
					<div className="flex justify-center items-center gap-2 my-8">
						<Button
							variant="outline"
							size="icon"
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="rounded-full"
						>
							<ChevronLeftIcon className="h-4 w-4" />
						</Button>
						<div className="flex items-center gap-1">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => (
									<Button
										key={page}
										variant={currentPage === page ? "default" : "outline"}
										size="sm"
										onClick={() => handlePageChange(page)}
										className={`rounded-full ${
											currentPage === page
												? "bg-indigo-600 hover:bg-indigo-700"
												: "bg-transparent text-slate-700 hover:text-indigo-600 hover:bg-indigo-50"
										}`}
									>
										{page}
									</Button>
								)
							)}
						</div>
						<Button
							variant="outline"
							size="icon"
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="rounded-full"
						>
							<ChevronRightIcon className="h-4 w-4" />
						</Button>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{currentEvents.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>

				{/* Pagination Controls */}
			</div>
		</Layout>
	);
};

const EventCard = ({ event }: { event: EventInterface }) => {
	const formattedDate = format(new Date(event.date), "MMMM d, yyyy");

	return (
		<Card className="h-full flex flex-col rounded-lg shadow-md border-slate-200">
			<CardHeader>
				<div className="flex justify-between items-start">
					<CardTitle className="text-slate-800">{event.title}</CardTitle>
					<span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
						{event.category}
					</span>
				</div>
			</CardHeader>
			<CardContent className="flex-grow">
				<CardDescription className="text-sm mb-4 text-slate-600">
					{event.description}
				</CardDescription>
				<div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
					<CalendarIcon className="h-4 w-4" />
					<span>{formattedDate}</span>
				</div>
				<div className="flex items-center gap-2 text-sm text-slate-500">
					<MapPinIcon className="h-4 w-4" />
					<span>{event.location}</span>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					variant="outline"
					className="w-full rounded-full text-indigo-600 hover:bg-indigo-50 border-indigo-200"
				>
					View Details
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ListEventsPage;
