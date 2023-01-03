import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routes, setRoutes] = useState([
    { id: 1, path: "/", name: "Home", element: <Home />, loginRoute: false },
    {
      id: 2,
      path: "/login",
      name: "Login",
      element: <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      loginRoute: true,
    },
    {
      id: 3,
      path: "/register",
      name: "Register",
      element: (
        <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ),
      loginRoute: true,
    },
  ]);

  return (
    <div>
      <NavbarComponent
        routes={routes}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.id} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
