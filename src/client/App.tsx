
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routes";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/authSlice";

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

const App = () => {
	const AuthState = useSelector(selectCurrentUser);
	return (
		<RouterProvider router={router} context={{AuthState}} />
	)
}

export default App
