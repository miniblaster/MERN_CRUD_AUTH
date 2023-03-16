import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskAdd from "./components/TaskAdd";
import NotFound from "./components/NotFound";

import useAuth from "./hooks/useAuth";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {

  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LandingPage />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/signup" exact element={<Signup />}></Route>
        {isAuthenticated && (
          <>
            <Route path="/tasklist" exact element={<TaskList />}></Route>
            <Route path="/add" exact element={<TaskAdd />}></Route>
          </>
        )}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
