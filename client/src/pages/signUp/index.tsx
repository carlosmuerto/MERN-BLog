import { Link, useNavigate } from "@tanstack/react-router";
import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { BsGithub } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

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

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<SignUpInputs> = async (e: SignUpInputs) => {
    setIsLoading(true);
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(e),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(() => {
        // all good
        navigate({ to: "/signIn" });

      })
      .catch((response) => {
        // good conection bad response
        // 3. get error messages, if any
        response.json().then((errorJson: { messageStack: { [x: string]: string; }; message: string; }) => {
          const emptyMessageStack = true;
          for (const entry in errorJson.messageStack) {
            if (
              entry == "username" ||
              entry == "email" ||
              entry == "password"
            ) {
              setError(entry, {
                message: errorJson.messageStack[entry],
              });
            }
          }
          if (emptyMessageStack) {
            setError("root", {
              message: errorJson.message,
            });
          }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
                {errors.email && <p>{errors.email.message}</p>}
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
