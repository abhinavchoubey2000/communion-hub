import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/hero/1.avif";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
	const heroRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const buttonsRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// Initial animations
		const tl = gsap.timeline();

		// Heading animation
		tl.from(headingRef.current, {
			opacity: 0,
			y: 50,
			duration: 1,
			ease: "power2.out",
		})
			// Subtitle animation
			.from(
				subtitleRef.current,
				{
					opacity: 0,
					y: 30,
					duration: 1,
					ease: "power2.out",
				},
				"-=0.5"
			)
			// Buttons animation
			.from(
				buttonsRef.current,
				{
					opacity: 0,
					y: 20,
					duration: 0.8,
					ease: "power2.out",
				},
				"-=0.5"
			)
			// Image animation
			.from(
				imageRef.current,
				{
					opacity: 0,
					x: 100,
					duration: 1,
					ease: "back.out(1.2)",
				},
				"-=0.5"
			);

		// Scroll animations
		// Parallax effect for the image
		gsap.to(imageRef.current, {
			y: 50,
			scrollTrigger: {
				trigger: heroRef.current,
				start: "top top",
				end: "bottom top",
				scrub: 1,
			},
		});

		// Button hover animations
		if (buttonsRef.current) {
			const buttons = buttonsRef.current.querySelectorAll("button");
			buttons.forEach((button: Element) => {
				button.addEventListener("mouseenter", () => {
					gsap.to(button, {
						scale: 1.05,
						duration: 0.3,
						ease: "power1.out",
					});
				});

				button.addEventListener("mouseleave", () => {
					gsap.to(button, {
						scale: 1,
						duration: 0.3,
						ease: "power1.out",
					});
				});
			});
		}
	}, []);

	return (
		<section
			ref={heroRef}
			className="min-h-screen bg-white py-12 sm:py-16 md:py-20"
			id="hero"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
					<div className="w-full lg:w-1/2 text-center lg:text-left">
						<div className="max-w-2xl mx-auto lg:mx-0">
							<h1
								ref={headingRef}
								className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight"
							>
								Building bridges across{" "}
								<span className="text-indigo-600">faith</span> traditions
							</h1>
							<p
								ref={subtitleRef}
								className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
							>
								Communion is a digital platform fostering meaningful connections
								between people of diverse religious and spiritual backgrounds.
							</p>
							<div
								ref={buttonsRef}
								className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
							>
								<Link to="/events" className="w-full sm:w-auto">
									<Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-white text-base sm:text-lg">
										Explore Events
									</Button>
								</Link>
							</div>
						</div>
					</div>
					<div className="w-full lg:w-1/2 relative">
						<div ref={imageRef} className="relative z-10">
							<img
								src={heroImage}
								alt="People connecting across faiths"
								className="w-full h-auto rounded-xl shadow-lg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
