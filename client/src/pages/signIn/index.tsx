import { Link } from "@tanstack/react-router";
import { Button, TextInput } from "flowbite-react";
import { BsGithub } from "react-icons/bs";

type Props = {};

const SignIn = (_props: Props) => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="left-side flex-1">
          <Link
            to="/"
            className="self-center whitespace-nowrap font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 font-bold">MERN</span>
            blog
          </Link>
          <p className="text-sm mt-5">
            check this
            <span className="font-bold dark:text-white mx-1">
              project
              <Link
                href="https://github.com/carlosmuerto/MERN-BLog"
                className="inline-block  ml-1"
              >
                <BsGithub />
              </Link>
            </span>
            and look how it works, you can SignIn with email and password or continue with Google
          </p>
        </div>
        <div className="rigth-side flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <TextInput type="text" placeholder="email" id="email"/>
            </div>
            <div className="">
              <TextInput type="text" placeholder="password" id="password"/>
            </div>
            <Button type="submit">
              Sign In
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>create a account?</span>
            <Link to="/signUp" className="text-blue-500">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
