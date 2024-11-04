import { Link } from "@tanstack/react-router";
import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

// type Props = {}

const Header = () => {
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
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

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray">
          <FaMoon />
        </Button>
        <Link to="/signIn">
          <Button>Sign In</Button>
        </Link>
        <Navbar.Toggle className="" />
      </div>
      <Navbar.Collapse>
        <Link className="" to="/">
          {({ isActive }) => (
						<Navbar.Link active={isActive} as={'div'}>Home</Navbar.Link>
					)}
        </Link>
        <Link className="" to="/about">
          {({ isActive }) => (
						<Navbar.Link active={isActive} as={'div'}>About</Navbar.Link>
					)}
        </Link>
        <Link className="" to="/projects">
          {({ isActive }) => (
						<Navbar.Link active={isActive} as={'div'}>Projects</Navbar.Link>
					)}
        </Link>
      </Navbar.Collapse>

      {/*
       */}
    </Navbar>
  );
};

export default Header;
