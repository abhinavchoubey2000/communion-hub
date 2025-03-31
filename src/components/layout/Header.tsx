import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
	const headerImageRef = useRef(null);
	const homeNavRef = useRef(null);
	const eventsNavRef = useRef(null);
	const aboutNavRef = useRef(null);
	const navRef = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useGSAP(() => {
		const tl = gsap.timeline();
		gsap.from(headerImageRef.current, {
			opacity: 0,
			duration: 1,
		});
		tl.from([homeNavRef.current, eventsNavRef.current, aboutNavRef.current], {
			opacity: 0,
			duration: 1,
			y: 50,
			stagger: 0.5,
		});
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header
			className={`sticky top-0 z-50 transition-all duration-300 ${
				isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
			}`}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center">
					<Link to="/">
						<img
							ref={headerImageRef}
							src="/logo.png"
							alt="logo"
							className="h-8 w-auto"
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav ref={navRef} className="hidden md:flex items-center space-x-1">
						<Link
							ref={homeNavRef}
							to="/"
							className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-full hover:bg-indigo-50 transition-colors"
						>
							Home
						</Link>
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger
										ref={eventsNavRef}
										className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-full hover:bg-indigo-50 transition-colors"
									>
										Events
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="p-2 w-48">
											<Link
												to="/events"
												className="block px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-full hover:bg-indigo-50 transition-colors"
											>
												List Events
											</Link>
											<Link
												to="/events/add"
												className="block px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-full hover:bg-indigo-50 transition-colors"
											>
												Add Event
											</Link>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
						<a
							href="#about"
							ref={aboutNavRef}
							className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-full hover:bg-indigo-50 transition-colors"
						>
							About
						</a>
						<Button className="ml-4 bg-[#353535] hover:bg-[#515050] rounded-full">
							Sign in
						</Button>
					</nav>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							onClick={toggleMenu}
							className="text-slate-700 hover:text-indigo-600 focus:outline-none"
							aria-label="Toggle menu"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{isMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<nav className="md:hidden pt-4 pb-2 border-t mt-4">
						<div className="flex flex-col space-y-1">
							<Link
								to="/"
								className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Home
							</Link>
							<Link
								to="/events"
								className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Events
							</Link>
							<Link
								to="/events/add"
								className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Add Event
							</Link>
							<a
								href="#about"
								className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								About
							</a>
							<Button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 rounded-full">
								Get Started
							</Button>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Header;
