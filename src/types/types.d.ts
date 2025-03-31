export interface EventInterface {
	id: string;
	title: string;
	date: string;
	location: string;
	description: string;
	category: "Religious" | "Social" | "Charity";
}
export interface InitialStateInterface {
	events: Array<EventInterface>;
}