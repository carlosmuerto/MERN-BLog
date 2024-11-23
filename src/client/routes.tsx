import { createRootRouteWithContext, createRoute, redirect } from "@tanstack/react-router";
import Root from "@components/root";
import Home from "@pages/home";
import About from "@pages/about";
import Projects from "@pages/projects";
import Dashboard from "@pages/dashboard";
import SignIn from "@pages/signIn";
import SignUp from "@pages/signUp";
import Profile from "@pages/dashboard/profile";
import { AuthState } from "@redux/authSlice";
import { Error } from "mongoose";
import newPost from "@/pages/dashboard/newPost";

export type AppRouteContext = {
	AuthState: AuthState
}

const redirectToLogInBeforeLoad = ({context}:{context:AppRouteContext}) => {
  if (!context.AuthState) {
    throw redirect({
      to: "/signIn",
    });
  }
}

const redirectToPofileBeforeLoad = ({context}:{context:AppRouteContext}) => {
  if (!context.AuthState) throw new Error("USER NOT DEFINED");
  
  if (!context.AuthState.isAdmin) {
    throw redirect({
      to: "/dashboard/profile",
    });
  }
}

const rootRoute = createRootRouteWithContext<AppRouteContext>()({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: Projects,
});

const dashboardRoute = createRoute({
  beforeLoad: redirectToLogInBeforeLoad,
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

const newPostRoute = createRoute({
  beforeLoad: redirectToPofileBeforeLoad,
  getParentRoute: () => dashboardRoute,
  path: "/new-post",
  component: newPost,
});

const profileRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/profile",
  component: Profile,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signIn",
  component: SignIn,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signUp",
  component: SignUp,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  projectsRoute,
  dashboardRoute.addChildren([
    profileRoute,
    newPostRoute
  ]),
  signInRoute,
  signUpRoute,
]);
