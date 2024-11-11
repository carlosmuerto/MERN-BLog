import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeCredentials, selectCurrentUser } from "../../redux/authSlice";
import AuthAPI from "../../services/Auth";

const DashboardSidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const [
    registerSignOut,
    {
      isLoading: isSignOutLoading
    },
  ] = AuthAPI.useSignOutMutation();

  const handleSignout = () => {
    if (currentUser && currentUser.token) {
      dispatch(removeCredentials());
      registerSignOut(currentUser.token);
      navigate({ to: "/" });
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link className="" to="/dashboard/profile" >
            {({ isActive }) => (
              <Sidebar.Item
                active={isActive}
                icon={HiUser}
                label={"USER"}
                labelColor="dark"
                as={"div"}
              >
                Prifile
              </Sidebar.Item>
            )}
          </Link>

          <Sidebar.Item icon={HiArrowSmRight} disabled={isSignOutLoading} onClick={handleSignout} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
