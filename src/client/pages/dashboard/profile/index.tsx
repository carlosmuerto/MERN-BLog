import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import userDefaultProfileImage from "@assets/user_profile_icon.png";
import AuthAPI, { APIErros } from "@/services/Auth";
import {
  removeCredentials,
  selectCurrentUser,
  setCredentials,
} from "@redux/authSlice";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "@tanstack/react-router";

type ProfileUpdateInputs = {
  username: string;
  email: string;
  password: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [/* ignered element */, { isLoading: isSignOutLoading }] = AuthAPI.useSignOutMutation();

  const [
    registerUserUpdate,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      error: UpdateError,
      isError: isUpdateError,
      data: token,
    },
  ] = AuthAPI.useUpdateMutation();

  const [
    registerDelete,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteError,
      isError: isDeleteError
    },
  ] = AuthAPI.useDeleteMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProfileUpdateInputs>();

  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(setCredentials(token));
    }
  }, [isUpdateSuccess, token, dispatch]);

  useEffect(() => {
    if (isUpdateError) {
      console.log("in ", UpdateError);

      setError("root", { message: (UpdateError as APIErros).message });
    }
  }, [isUpdateError, UpdateError, setError]);

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(removeCredentials());
      navigate({ to: "/" });
    }
  }, [isDeleteSuccess, token, dispatch, navigate]);

  if (!currentUser) {
    return <div>USER NULL ERROR</div>;
  }

  const onSubmit: SubmitHandler<ProfileUpdateInputs> = async (e) => {
    const { email, password, username } = e;
    return registerUserUpdate({
      token: currentUser.token,
      email,
      password,
      username,
    });
  };

  const handleDeleteAccount = () => {
    if (currentUser && currentUser.token) {
      registerDelete(currentUser.token);
    }
  };

  const handleNewPost = () => {
    if (currentUser && currentUser.token) {
      navigate({ to: "/dashboard/new-post" });
    }
  };

  

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'">
          <img
            src={currentUser.profileImg || userDefaultProfileImage}
            alt="User Profile Image"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray] "
          />
        </div>
        <TextInput
          type="userName"
          id="username"
          placeholder="User Name"
          defaultValue={currentUser.username}
          {...register("username")}
        />
        <span className="text-sm text-red-500 mt-5">
          {errors.username && <p>{errors.username.message}</p>}
        </span>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          {...register("email")}
        />
        <span className="text-sm text-red-500 mt-5">
          {errors.email && <p>{errors.email.message}</p>}
        </span>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          {...register("password")}
        />
        <span className="text-sm text-red-500 mt-5">
          {errors.password && <p>{errors.password.message}</p>}
        </span>
        <Button type="submit" outline disabled={isSignOutLoading || isUpdateLoading || isDeleteLoading} >
          {isSignOutLoading || isUpdateLoading || isDeleteLoading? "loading" : "UpDate"}
        </Button>

        {currentUser.isAdmin && (
          <Button type="button" outline disabled={isSignOutLoading || isUpdateLoading || isDeleteLoading}  onClick={handleNewPost}>
            {isSignOutLoading || isUpdateLoading || isDeleteLoading? "loading" : "New Post"}
          </Button>
        )}

        {errors.root && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{errors.root.message}</span>
          </Alert>
        )}

        {!isDeleteLoading && isDeleteError && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{(deleteError as APIErros)?.message ?? deleteError}</span>
          </Alert>
        )}

        {isUpdateSuccess && !isUpdateLoading && (
          <Alert color="success" icon={HiInformationCircle}>
            <span className="font-medium">Update Success</span>
          </Alert>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={handleDeleteAccount} className="cursor-pointer">
          Delete Account
        </span>
        <></>
      </div>
      
    </div>
  );
};

export default Profile;
