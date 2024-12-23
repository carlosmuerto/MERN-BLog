import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiNewspaper, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeCredentials, selectCurrentUser } from "../../redux/authSlice";
import AuthAPI from "../../services/Auth";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const [registerSignOut, { isLoading: isSignOutLoading }] =
    AuthAPI.useSignOutMutation();

  const [, /* ignered element */ { isLoading: isUpdateLoading }] =
    AuthAPI.useUpdateMutation();

  const [, /* ignered element */ { isLoading: isDeleteLoading }] =
    AuthAPI.useDeleteMutation();

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
          <Link className="" to="/dashboard/profile">
            {({ isActive }) => (
              <Sidebar.Item
                active={isActive}
                icon={HiUser}
                label={currentUser?.isAdmin ? "ADMIN" : "USER"}
                labelColor={currentUser?.isAdmin ? "indigo" : "dark"}
                as={"div"}
              >
                Prifile
              </Sidebar.Item>
            )}
          </Link>

          <li>
            <Link
              className=""
              to="/dashboard/new-post"
              disabled={isSignOutLoading || isUpdateLoading || isDeleteLoading}
            >
              {({ isActive }) => (
                <Sidebar.Item active={isActive} icon={HiNewspaper} as={"div"}>
                  New Post
                </Sidebar.Item>
              )}
            </Link>
          </li>

          <Sidebar.Item
            icon={HiArrowSmRight}
            disabled={isSignOutLoading || isUpdateLoading || isDeleteLoading}
            onClick={handleSignout}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
