import { Link } from "@tanstack/react-router";

const Logo = () => {
  return (
    <Link
      to="/"
      className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
    >
      <span className="px-2 py-1 font-bold">MERN</span>
      blog
    </Link>
  );
};

export default Logo;
