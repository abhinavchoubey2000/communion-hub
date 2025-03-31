import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { addEvent } from "@/redux/event-slice";
import { EventInterface } from "@/types/types";
import { RootState } from "@/redux/store";

const formSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	date: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Please enter a valid date",
	}),
	location: z.string().min(3, "Location must be at least 3 characters"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	category: z.enum(["Religious", "Social", "Charity"]),
});

type FormValues = z.infer<typeof formSchema>;

const AddEventPage = () => {
	document.title = "Add Event | Communion Hub";
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { events } = useSelector((state: RootState) => state.Event);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			date: "",
			location: "",
			description: "",
			category: "Religious",
		},
	});

	const onSubmit = async (data: FormValues) => {
		setIsSubmitting(true);
		const saveData: EventInterface = { ...data, id: String(events.length + 1) };
		try {
			dispatch(addEvent(saveData));
			// Redirect to events list page
			navigate("/events");
		} catch (error) {
			console.error("Error submitting form:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Layout>
			<div className="container mx-auto py-8 max-w-2xl">
				<h1 className="text-3xl font-bold mb-8 text-center text-slate-800">
					Add New Event
				</h1>

				<div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-700">
											Event Title
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter event title"
												{...field}
												className="rounded-md border-slate-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-700">Event Date</FormLabel>
										<FormControl>
											<Input
												type="date"
												{...field}
												className="rounded-md border-slate-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-700">Location</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter event location"
												{...field}
												className="rounded-md border-slate-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-700">Category</FormLabel>
										<FormControl>
											<select
												className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
												{...field}
											>
												<option value="Religious">Religious</option>
												<option value="Social">Social</option>
												<option value="Charity">Charity</option>
											</select>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-700">
											Description
										</FormLabel>
										<FormControl>
											<textarea
												className="w-full p-2 border border-slate-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
												placeholder="Enter event description"
												{...field}
											/>
										</FormControl>
										<FormMessage className="text-red-500" />
									</FormItem>
								)}
							/>

							<div className="flex justify-end gap-4 pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate("/events")}
									className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-100"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="rounded-full bg-[#353535] hover:bg-[#515050]"
								>
									{isSubmitting ? "Submitting..." : "Add Event"}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Layout>
	);
};

export default AddEventPage;
