import "./App.css";
import Nav from "./components/Nav/Nav";
import { Outlet } from "react-router-dom";
import { store } from "./redux/Redux";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClint = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClint}>
      <Provider store={store}>
        <Nav />
        <Outlet />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
