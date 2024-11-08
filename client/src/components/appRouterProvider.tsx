import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "../routeTree.gen";
import { useSelector } from "react-redux";
import { AuthState, selectCurrentUser } from "../redux/authSlice";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		AuthState: null
	}
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export type AppRouteContext = {
	AuthState: AuthState
}

const AppRouterProvider = () => {

	const AuthState = useSelector(selectCurrentUser);
	const context: AppRouteContext = {
		AuthState
	}
	return (
		<RouterProvider router={router} context={context} />
	)
}

export default AppRouterProvider
