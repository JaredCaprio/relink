import "./sass/index.scss";
import { createContext, useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Dashboard from "./components/pages/Dashboard";
import HomeLayout from "./components/Layouts/HomeLayout";
import WordList from "./components/pages/WordList";
import UserContext from "./components/auth/UserContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} exact />
      <Route path="/" element={<Landing />} exact />
      <Route element={<HomeLayout />}>
        <Route path="home" element={<Dashboard />} exact />
        <Route path="wordlist" element={<WordList />} exact />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <UserContext>
        <RouterProvider router={router} />
      </UserContext>
    </div>
  );
}

export default App;
