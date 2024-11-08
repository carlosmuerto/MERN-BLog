import { Link /* useNavigate */, useNavigate } from "@tanstack/react-router";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "../logo";
import { useSelector } from "react-redux";
import {
  removeCredentials,
  selectCurrentUser,
} from "../../redux/authSlice";
import AuthAPI from "../../services/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectDarkMode, DarkModeActions } from "../../redux/darkModeSlice";

// type Props = {}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const darkMode = useSelector(selectDarkMode)

  const currentUser = useSelector(selectCurrentUser);
  const [
    registerSignOut,
    {
      isLoading: isSignOutLoading,
      isSuccess: isSignOutSuccess,
      isError: isSignOutError,
      error: SignOutError,
    },
  ] = AuthAPI.useSignOutMutation();

  useEffect(() => {
    if (currentUser && currentUser.token) {
      if (isSignOutSuccess) {
        dispatch(removeCredentials());
        navigate({ to: "/" });
      }
      if (isSignOutError) {
        console.log(SignOutError)
      }
    }
  }, [SignOutError, currentUser, dispatch, isSignOutError, isSignOutSuccess, navigate]);

  const handleSignout = () => {
    if (currentUser && currentUser.token) {
      registerSignOut(currentUser.token);
    }
  };

  const handleDarkModeToggle = () => {
    dispatch(DarkModeActions.toggle())
  }

  return (
    <Navbar className="border-b-2">
      <Logo />

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
        <Button className="w-12 h-10 hidden sm:inline" color="gray" type="button" onClick={handleDarkModeToggle}>
          {darkMode.isActive
            ? (<FaSun />) : (<FaMoon />)
          }
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profileImg || ""} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item disabled={isSignOutLoading} onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signIn">
            <Button>Sign In</Button>
          </Link>
        )}

        <Navbar.Toggle className="" />
      </div>
      <Navbar.Collapse>
        <Link className="" to="/">
          {({ isActive }) => (
            <Navbar.Link active={isActive} as={"div"}>
              Home
            </Navbar.Link>
          )}
        </Link>
        <Link className="" to="/about">
          {({ isActive }) => (
            <Navbar.Link active={isActive} as={"div"}>
              About
            </Navbar.Link>
          )}
        </Link>
        <Link className="" to="/projects">
          {({ isActive }) => (
            <Navbar.Link active={isActive} as={"div"}>
              Projects
            </Navbar.Link>
          )}
        </Link>
      </Navbar.Collapse>

      {/*
       */}
    </Navbar>
  );
};

export default Header;
