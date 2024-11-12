import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import userDefaultProfileImage from "@assets/user_profile_icon.png";
import AuthAPI, { APIErros } from "@/services/Auth";
import { selectCurrentUser, setCredentials } from "@redux/authSlice";
import { HiInformationCircle } from "react-icons/hi";

type ProfileUpdateInputs = {
  username: string;
  email: string;
  password: string;
};

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [registerUser, { isLoading, isSuccess, error, isError, data: token }] =
    AuthAPI.useUpdateMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProfileUpdateInputs>();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(token));
    }
  }, [isSuccess, token, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log("in ", error);

      setError("root", { message: (error as APIErros).message });
    }
  }, [isError, error, setError]);

  if (!currentUser) {
    return <div>USER NULL ERROR</div>;
  }

  const onSubmit: SubmitHandler<ProfileUpdateInputs> = async (e) => {
    const { email, password, username } = e;
    return registerUser({
      token: currentUser.token,
      email,
      password,
      username,
    });
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
        <Button type="submit" outline disabled={isLoading}>
          {isLoading ? "loading" : "UpDate"}
        </Button>
        {errors.root && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{errors.root.message}</span>
          </Alert>
        )}

        {(isSuccess && !isLoading) && (
          <Alert color="success" icon={HiInformationCircle}>
            <span className="font-medium">Update Success</span>
          </Alert>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => {}} className="cursor-pointer">
          Delete Account
        </span>
        <></>
      </div>
    </div>
  );
};

export default Profile;
