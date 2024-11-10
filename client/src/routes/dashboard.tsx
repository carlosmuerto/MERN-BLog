import { createFileRoute, redirect } from "@tanstack/react-router";
import Dashboard from "../pages/dashboard";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.AuthState) {
      console.log("Enter")
      throw redirect({
        to: "/signIn",
      });
    }
  },
  component: Dashboard,
});