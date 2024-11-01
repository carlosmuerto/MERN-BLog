import { Link } from "@tanstack/react-router";
import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

// type Props = {}

const Header = () => {
	return (
		<Navbar className="border-b-2">
			<Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
				<span className="px-2 py-1 font-bold">MERN</span>
				blog
			</Link>

			<form>
				<TextInput 
					className="hidden lg:inline"
					type="text"
					placeholder="search"
					rightIcon={AiOutlineSearch}
				/>
			</form>
			
			<Button className="w-12 h-10 lg:hidden" color="gray">
				<AiOutlineSearch />
			</Button>

{/* 
			<Link to="/" className=" [&.active]:font-bold">
				<span>MERN</span>
				blog
			</Link> */}

		</Navbar>
	);
};

export default Header;
