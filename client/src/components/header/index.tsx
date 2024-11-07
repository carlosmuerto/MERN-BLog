import { Link, /* useNavigate */ } from "@tanstack/react-router";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import Logo from "../logo";
import { useSelector } from "react-redux";
import { selectCurrentUser, } from "../../redux/authSlice";
// import { useDispatch } from "react-redux";

// type Props = {}

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  // const [registerUser, /*{ isLoading, isSuccess, error, isError , data: user  }*/] = AuthAPI.useSignInMutation()
  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  const handleSignout = () => {

    fetch('/api/currentUser', {
      method: 'get',
      headers: {
        "Authorization": `Bearer ${currentUser?.token}`
      }
    }).then(res => {
      console.log(res)
      res.json().then((body) => console.log(body)).catch((err) => console.log(err))
      
    })
      .catch((err) => console.log(err));

  };

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
        <Button className="w-12 h-10 hidden sm:inline" color="gray">
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={ <Avatar alt='user' img={currentUser.profileImg || ""} rounded /> }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
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
