import { Button } from "@/components/ui/button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const About = () => {
	const aboutRef = useRef(null);
	const headingRef = useRef(null);
	const cardsRef = useRef(null);
	const leftCardsRef = useRef<HTMLDivElement>(null);
	const rightCardsRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef(null);

	useGSAP(() => {
		const tl = gsap.timeline();
		tl.from(headingRef.current, {
			opacity: 0,
			duration: 1,
			delay: 1,
			y: 50,
			scale: 0.5,
			stagger: 0.5,
			scrollTrigger: {
				trigger: aboutRef.current,
				start: "top 90%",
				end: "bottom 100%",
			},
		});
		tl.from(leftCardsRef.current, {
			opacity: 1,
			duration: 2,
			stagger: 1,
		});
	});

	return (
		<section ref={aboutRef} className="py-20 bg-white" id="about">
			<div className="container mx-auto px-4">
				<div ref={headingRef} className="text-center mb-16">
					<span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4 reveal-item">
						About Us
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">
						We're bridging faith traditions with modern technology
					</h2>
					<p className="text-lg text-slate-600 max-w-2xl mx-auto">
						Creating spaces for mutual understanding, learning, and connection
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
					<div ref={cardsRef} className="lg:col-span-7 order-2 lg:order-1">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div ref={leftCardsRef} className="space-y-4">
								<div className="feature-card bg-yellow-100 p-6 rounded-xl shadow-sm transition-all duration-300 cursor-pointer">
									<div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mb-4">
										<span className="text-2xl">🌈</span>
									</div>
									<h3 className="text-lg font-bold text-slate-800 mb-2">
										Diverse Perspectives
									</h3>
									<p className="text-slate-600">
										Bringing together viewpoints from across the faith spectrum
									</p>
								</div>

								<div className="feature-card bg-green-100 p-6 rounded-xl shadow-sm transition-all duration-300 cursor-pointer">
									<div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mb-4">
										<span className="text-2xl">🌱</span>
									</div>
									<h3 className="text-lg font-bold text-slate-800 mb-2">
										Personal Growth
									</h3>
									<p className="text-slate-600">
										Expanding horizons and deepening your own faith journey
									</p>
								</div>
							</div>

							<div ref={rightCardsRef} className="space-y-4">
								<div className="feature-card bg-blue-100 p-6 rounded-xl shadow-sm transition-all duration-300 cursor-pointer">
									<div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-4">
										<span className="text-2xl">💬</span>
									</div>
									<h3 className="text-lg font-bold text-slate-800 mb-2">
										Respectful Dialogue
									</h3>
									<p className="text-slate-600">
										Creating spaces for meaningful conversations across
										traditions
									</p>
								</div>

								<div className="feature-card bg-purple-100 p-6 rounded-xl shadow-sm transition-all duration-300 cursor-pointer">
									<div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mb-4">
										<span className="text-2xl">🔄</span>
									</div>
									<h3 className="text-lg font-bold text-slate-800 mb-2">
										Shared Experiences
									</h3>
									<p className="text-slate-600">
										Building relationships through collaborative activities
									</p>
								</div>
							</div>
						</div>
					</div>

					<div ref={contentRef} className="lg:col-span-5 order-1 lg:order-2">
						<div className="pl-0 lg:pl-6">
							<h3 className="text-2xl font-bold text-slate-800 mb-6">
								Our mission is to create understanding across faith traditions
							</h3>

							<p className="text-lg text-slate-600 mb-6">
								Communion Hub is where technology meets interfaith dialogue.
								We're building innovative tools and spaces that make it easy for
								people of different religious backgrounds to connect, learn from
								each other, and build meaningful relationships.
							</p>

							<p className="text-lg text-slate-600 mb-8">
								Whether you're deeply rooted in your own tradition or simply
								curious about others, our platform offers a welcoming
								environment for exploration and connection.
							</p>

							<div className="flex flex-wrap gap-4 mb-8">
								<div className="flex items-center checkmark-item">
									<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
										<svg
											className="w-5 h-5 text-indigo-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<span className="text-slate-700">
										Fostering understanding
									</span>
								</div>

								<div className="flex items-center checkmark-item">
									<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
										<svg
											className="w-5 h-5 text-indigo-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<span className="text-slate-700">Building connections</span>
								</div>

								<div className="flex items-center checkmark-item">
									<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
										<svg
											className="w-5 h-5 text-indigo-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<span className="text-slate-700">Creating community</span>
								</div>
							</div>

							<Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 py-6 text-white">
								Learn More About Us
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
