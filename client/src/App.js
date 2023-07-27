import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";

/**
 * BrowserRouter: a router for webbrowsers that provides the cleanest URL's
 * Routes: a container for all the routes
 * Route: a single route (path: the path the route is taking, element: the component that is rendered when the path is taken)
 * @returns
 */
const App = () => {
  // create a new instance of the Cookies class
  const cookies = new Cookies();

  return (
    <BrowserRouter>
      <Routes>
        {!cookies.get("auth_token") && <Route path="/" element={<Home />} />}
        <Route path="/" element={<Home />} />
        {cookies.get("auth_token") && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {cookies.get("auth_token") && (
          <Route path="/onboarding" element={<OnBoarding />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
