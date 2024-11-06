import { Link, useNavigate } from "@tanstack/react-router";
import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { BsGithub } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi";
import AuthAPI, { SignInErros } from "../../services/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";

type SignUpInputs = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    registerUser,
    { isLoading, isSuccess, error, isError , data: user },
  ] = AuthAPI.useSignUpMutation();

  const onSubmit: SubmitHandler<SignUpInputs> = async (e) => registerUser(e);

  useEffect(() => {
    if (isSuccess) {
      console.log("page")
      console.log(user)
      dispatch(setCredentials(user))
      navigate({ to: "/" });
    }
  }, [isSuccess, navigate, user, dispatch]);

  useEffect(() => {
    if (isError) {
      const errorData = (error as SignInErros)
      console.log("in ", error);
      const emptyMessageStack = true;
      for (const entry in errorData.messageStack) {
        if (entry == "username" || entry == "email" || entry == "password") {
          setError(entry, {
            message: errorData.messageStack[entry],
          });
        }
      }
      if (emptyMessageStack) {
        setError("root", {
          message: errorData.message,
        });
      }
      setError("root", { message: errorData.message });
    }
  }, [isError, error, setError]);

  return (
    <div className="min-h-screen mt-20">
      {user?.username}
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
            and look how it works, you can signUp with email and password or
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
                {...register("username", { required: true })}
                type="text"
                placeholder="username"
                id="username"
              />
              <span className="text-sm text-red-500 mt-5">
                {errors.username && <p>{errors.username.message}</p>}
              </span>
            </div>
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
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            {errors.root && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">{errors.root.message}</span>
              </Alert>
            )}
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>have a account?</span>
            <Link to="/signIn" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
