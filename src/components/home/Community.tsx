import { Button } from "@/components/ui/button";
import userImage1 from "@/assets/avatars/1.avif";
import userImage2 from "@/assets/avatars/2.avif";
import userImage3 from "@/assets/avatars/3.avif";
import userImage4 from "@/assets/avatars/4.avif";
import { useRef, useEffect, RefCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

// Make sure plugins are registered
gsap.registerPlugin(ScrollTrigger);

// Create a type-safe callback for quote refs
const createQuoteRefCallback =
	(
		quoteRefs: React.MutableRefObject<(HTMLParagraphElement | null)[]>,
		index: number
	): RefCallback<HTMLParagraphElement> =>
	(el) => {
		quoteRefs.current[index] = el;
	};

const Community = () => {
	const communityRef = useRef(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const testimonialsRef = useRef<HTMLDivElement>(null);
	const engagementRef = useRef<HTMLDivElement>(null);
	const ctaRef = useRef<HTMLButtonElement>(null);
	const quoteRefs = useRef<(HTMLParagraphElement | null)[]>([]);

	useEffect(() => {
		// Set initial visibility
		if (headingRef.current) gsap.set(headingRef.current, { opacity: 1 });
		if (testimonialsRef.current)
			gsap.set(testimonialsRef.current, { opacity: 1 });
		if (engagementRef.current) gsap.set(engagementRef.current, { opacity: 1 });
		if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 });

		// Initialize all elements with proper opacity
		gsap.set(".testimonial-card", { opacity: 1 });
		gsap.set(".engagement-card", { opacity: 1 });
		gsap.set(".emoji-container", { opacity: 1 });

		const ctx = gsap.context(() => {
			// Create a timeline for the main title animation
			if (headingRef.current) {
				const headingTitle = headingRef.current.querySelector("h2");

				if (headingTitle) {
					// Create a staggered letter animation for the main heading
					gsap.from(headingTitle, {
						opacity: 0,
						y: 50,
						duration: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: headingTitle,
							start: "top 85%",
							once: true,
						},
					});

					// Add a highlight effect to the word "vibrant"
					const highlightText = () => {
						const text = headingTitle.innerHTML;
						const newText = text.replace(
							"vibrant",
							"<span class='highlight-word'>vibrant</span>"
						);
						headingTitle.innerHTML = newText;

						gsap.to(".highlight-word", {
							color: "#6d28d9",
							fontWeight: "700",
							duration: 1,
							ease: "power2.inOut",
							scrollTrigger: {
								trigger: headingTitle,
								start: "top 85%",
								once: true,
							},
						});
					};

					setTimeout(highlightText, 1000);
				}
			}

			// Animate the testimonials section with parallax
			if (testimonialsRef.current) {
				gsap.from(testimonialsRef.current, {
					opacity: 0,
					y: 30,
					duration: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: testimonialsRef.current,
						start: "top 80%",
						once: true,
					},
				});

				// Create a parallax scroll effect for the testimonials section
				gsap.to(testimonialsRef.current, {
					backgroundPosition: "0% 100%",
					ease: "none",
					scrollTrigger: {
						trigger: testimonialsRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: 1,
					},
				});
			}

			// Animate each testimonial card with stagger
			gsap.from(".testimonial-card", {
				opacity: 0,
				y: 20,
				stagger: 0.2,
				duration: 0.8,
				ease: "back.out(1.2)",
				scrollTrigger: {
					trigger: ".testimonial-grid",
					start: "top 80%",
					once: true,
				},
			});

			// Animate testimonial quotes
			quoteRefs.current.forEach((quote, index) => {
				if (quote) {
					gsap.from(quote, {
						opacity: 0,
						scale: 0.9,
						delay: 0.3 + index * 0.1,
						duration: 0.8,
						ease: "back.out(1.7)",
						scrollTrigger: {
							trigger: quote,
							start: "top 85%",
							once: true,
						},
					});
				}
			});

			// Subtle floating animation for testimonial cards that won't get stuck
			const floatingCards = gsap.timeline({
				repeat: -1,
				yoyo: true,
				defaults: { duration: 2, ease: "sine.inOut" },
			});

			floatingCards
				.to(".testimonial-card:nth-child(odd)", { y: "-8px" })
				.to(".testimonial-card:nth-child(even)", { y: "-8px" }, "-=1.8");

			// Animate the engagement section with a reveal effect
			if (engagementRef.current) {
				gsap.from(engagementRef.current, {
					opacity: 0,
					y: 30,
					duration: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: engagementRef.current,
						start: "top 80%",
						once: true,
					},
				});
			}

			// 3D tilt effect for engagement cards on scroll
			const engagementCards =
				gsap.utils.toArray<HTMLElement>(".engagement-card");
			engagementCards.forEach((card, i) => {
				// Create a parallax effect for each card as it scrolls
				gsap.to(card, {
					rotationY: i % 2 === 0 ? 5 : -5,
					rotationX: 5,
					scale: 1.05,
					scrollTrigger: {
						trigger: card,
						start: "top bottom",
						end: "bottom top",
						scrub: 2,
					},
				});
			});

			// Staggered entrance for engagement cards
			gsap.from(".engagement-card", {
				opacity: 0,
				scale: 0.9,
				stagger: 0.2,
				duration: 0.8,
				ease: "back.out(1.4)",
				scrollTrigger: {
					trigger: ".engagement-grid",
					start: "top 80%",
					once: true,
				},
			});

			// Subtle pulse animation for emoji containers
			const pulseEmoji = gsap.timeline({
				repeat: -1,
				yoyo: true,
				defaults: { duration: 1.5, ease: "sine.inOut" },
			});

			pulseEmoji.to(".emoji-container", { scale: 1.08 });

			// Animate the CTA button
			if (ctaRef.current) {
				gsap.from(ctaRef.current, {
					opacity: 0,
					y: 20,
					scale: 0.9,
					duration: 0.8,
					ease: "back.out(1.7)",
					scrollTrigger: {
						trigger: ctaRef.current,
						start: "top 90%",
						once: true,
					},
				});

				// Add a spotlight effect to the CTA
				gsap.to(ctaRef.current, {
					boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)",
					repeat: -1,
					yoyo: true,
					duration: 2,
					ease: "sine.inOut",
					delay: 1,
				});
			}
		}, communityRef);

		return () => {
			// Clean up all animations to prevent stuck animations
			ctx.revert();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			gsap.killTweensOf([
				".testimonial-card",
				".engagement-card",
				".emoji-container",
				".highlight-word",
			]);
			if (headingRef.current) gsap.killTweensOf(headingRef.current);
			if (testimonialsRef.current) gsap.killTweensOf(testimonialsRef.current);
			if (engagementRef.current) gsap.killTweensOf(engagementRef.current);
			if (ctaRef.current) gsap.killTweensOf(ctaRef.current);
		};
	}, []);

	return (
		<section ref={communityRef} className="py-20 bg-white" id="community">
			<div className="container mx-auto px-4">
				<div ref={headingRef} className="text-center mb-16">
					<span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
						Our Community
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 max-w-3xl mx-auto">
						Join a vibrant community of faith explorers
					</h2>
					<p className="text-lg text-slate-600 max-w-2xl mx-auto">
						Connect with others who are passionate about building bridges across
						faith traditions
					</p>
				</div>

				<div
					ref={testimonialsRef}
					className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl overflow-hidden mb-20 transform-gpu"
					style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
						<div className="p-8 md:p-12 lg:p-16 flex items-center">
							<div>
								<h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
									A place where diverse perspectives are welcomed and celebrated
								</h3>
								<p className="text-lg text-slate-600 mb-8 testimonial-text">
									Our community brings together people from various religious
									backgrounds who share a common goal: to foster understanding,
									respect, and meaningful connections.
								</p>
								<p className="text-lg text-slate-600 mb-8 testimonial-text">
									Whether you're seeking to deepen your own faith journey, learn
									about other traditions, or simply connect with open-minded
									individuals, you'll find a welcoming space in the Communion
									Hub community.
								</p>
								<Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 py-6 text-white">
									Join Our Community
								</Button>
							</div>
						</div>

						<div className="relative h-full min-h-[300px] lg:min-h-0 bg-slate-100 overflow-hidden">
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
								<div className="testimonial-grid grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 absolute inset-0">
									<div className="flex flex-col gap-4">
										<div className="testimonial-card bg-white p-4 rounded-xl shadow-sm transition-all duration-300">
											<div className="flex mb-3">
												<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
													<img
														className="rounded-full"
														src={userImage1}
														alt="user image 1"
													/>
												</div>
												<div>
													<h4 className="font-bold text-slate-800">John M.</h4>
													<p className="text-xs text-slate-500">USA</p>
												</div>
											</div>
											<p
												ref={createQuoteRefCallback(quoteRefs, 0)}
												className="text-sm text-slate-600 quote-text"
											>
												"Communion has transformed how I connect with my
												community, fostering unity and understanding among
												diverse faiths. The platform's ability to bring people
												together has created meaningful relationships."
											</p>
										</div>

										<div className="testimonial-card bg-white p-4 rounded-xl shadow-sm transition-all duration-300">
											<div className="flex mb-3">
												<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
													<img
														className="rounded-full"
														src={userImage2}
														alt="user 2"
													/>
												</div>
												<div>
													<h4 className="font-bold text-slate-800">Rohan K.</h4>
													<p className="text-xs text-slate-500">India</p>
												</div>
											</div>
											<p
												ref={createQuoteRefCallback(quoteRefs, 1)}
												className="text-sm text-slate-600 quote-text"
											>
												"Being part of Communion is life-changing, blending
												innovation with spirituality to create a truly inclusive
												space. The events and discussions have deepened my
												understanding of different faiths and cultures."
											</p>
										</div>
									</div>

									<div className="flex flex-col gap-4 mt-0 sm:mt-8">
										<div className="testimonial-card bg-white p-4 rounded-xl shadow-sm transition-all duration-300">
											<div className="flex mb-3">
												<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
													<img
														className="rounded-full"
														src={userImage3}
														alt="user 3"
													/>
												</div>
												<div>
													<h4 className="font-bold text-slate-800">Amira L.</h4>
													<p className="text-xs text-slate-500">UAE</p>
												</div>
											</div>
											<p
												ref={createQuoteRefCallback(quoteRefs, 2)}
												className="text-sm text-slate-600 quote-text"
											>
												"Through Communion, I've joined events and discussions
												that broadened my perspective and connected me globally.
												The platform's interfaith dialogue features have helped
												me grow spiritually."
											</p>
										</div>

										<div className="testimonial-card bg-white p-4 rounded-xl shadow-sm transition-all duration-300">
											<div className="flex mb-3">
												<div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
													<img
														className="rounded-full h-10 w-10"
														src={userImage4}
														alt="user 4"
													/>
												</div>
												<div>
													<h4 className="font-bold text-slate-800">Sarah P.</h4>
													<p className="text-xs text-slate-500">UK</p>
												</div>
											</div>
											<p
												ref={createQuoteRefCallback(quoteRefs, 3)}
												className="text-sm text-slate-600 quote-text"
											>
												"The platform's interfaith dialogue features have helped
												me understand different perspectives and grow
												spiritually. Communion provides a safe space for
												meaningful conversations and cultural exchange."
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div ref={engagementRef} className="text-center mb-16">
					<h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
						How Our Community Engages
					</h3>
					<p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
						From virtual gatherings to local meetups, our community comes
						together in many ways
					</p>

					<div className="engagement-grid grid grid-cols-1 md:grid-cols-3 gap-8 perspective">
						<div className="engagement-card bg-yellow-50 p-8 rounded-2xl hover:shadow-md transition-shadow transform-gpu">
							<div className="emoji-container w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
								<span className="text-2xl">🌐</span>
							</div>
							<h4 className="text-xl font-bold text-slate-800 mb-3">
								Online Forums
							</h4>
							<p className="text-slate-600">
								Engage in thoughtful discussions about faith, spirituality, and
								religious practices in our moderated online spaces.
							</p>
						</div>

						<div className="engagement-card bg-blue-50 p-8 rounded-2xl hover:shadow-md transition-shadow transform-gpu">
							<div className="emoji-container w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
								<span className="text-2xl">🎯</span>
							</div>
							<h4 className="text-xl font-bold text-slate-800 mb-3">
								Virtual Events
							</h4>
							<p className="text-slate-600">
								Participate in webinars, discussion groups, and interactive
								learning experiences led by faith leaders and scholars.
							</p>
						</div>

						<div className="engagement-card bg-green-50 p-8 rounded-2xl hover:shadow-md transition-shadow transform-gpu">
							<div className="emoji-container w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
								<span className="text-2xl">🤝</span>
							</div>
							<h4 className="text-xl font-bold text-slate-800 mb-3">
								Local Gatherings
							</h4>
							<p className="text-slate-600">
								Connect with community members in your area for in-person
								dialogues, celebrations, and interfaith activities.
							</p>
						</div>
					</div>
				</div>

				<div className="text-center">
					<Link to="/events">
						<Button
							ref={ctaRef}
							className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-10 py-6 text-lg text-white transform transition-all"
						>
							Visit the list of events
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Community;
