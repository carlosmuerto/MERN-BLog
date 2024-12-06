import { Link, useNavigate } from "@tanstack/react-router";
import { Alert, Button, TextInput } from "flowbite-react";
import { BsGithub } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi";
import AuthAPI from "../../services/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { APIErros } from "@/Utils";

type SignInInputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [registerUser, { isLoading, isSuccess, error, isError, data: token }] =
    AuthAPI.useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInInputs>();

  const onSubmit: SubmitHandler<SignInInputs> = async (e) => registerUser(e);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(token));
      navigate({ to: "/" });
    }
  }, [isSuccess, navigate, token, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log("in ", error);

      setError("root", { message: (error as APIErros).message });
    }
  }, [isError, error, setError]);

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
              <a
                href="https://github.com/carlosmuerto/MERN-BLog"
                target="_blank"
                className="inline-block  ml-1"
              >
                <BsGithub />
              </a>
            </span>
            and look how it works, you can SignIn with email and password or
            continue with Google
          </p>
        </div>
        <div className="rigth-side flex-1">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="">
              <TextInput
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                id="email"
              />
              <span className="text-sm text-red-500 mt-5">
                {errors.email && <p>{errors.email.message}</p>}
              </span>
            </div>
            <div className="">
              <TextInput
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
                id="password"
              />
              <span className="text-sm text-red-500 mt-5">
                {errors.password && <p>{errors.password.message}</p>}
              </span>
            </div>
            <Button disabled={isLoading} type="submit">
              {" "}
              {isLoading ? "loading" : "Sign In"}
            </Button>
            {errors.root && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">{errors.root.message}</span>
              </Alert>
            )}
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>create a account?</span>
            <Link to="/signUp" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
