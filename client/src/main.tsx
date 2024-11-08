import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/themeProvider";
import AppRouterProvider from "./components/appRouterProvider";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <AppRouterProvider />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}
