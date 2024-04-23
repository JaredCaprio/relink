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
import Dashboard, { DashboardLoader } from "./components/pages/Dashboard";
import HomeLayout from "./components/layouts/HomeLayout";
import WordList, { wordListLoader } from "./components/pages/WordList";
import UserContext from "./components/auth/UserContext";
import EnsureAuth from "./components/auth/EnsureAuth";
import EnsureGuest from "./components/auth/EnsureGuest";
import Addmaterial from "./components/pages/Addmaterial";
import Readinglist, { materialsLoader } from "./components/pages/ReadingList";
import { chartDataLoader } from "./components/pages/Statistics";
import Error404 from "./components/error/Error404";
import Error500 from "./components/error/Error500";
import Viewmaterial, {
  viewMaterialsLoader,
} from "./components/pages/Viewmaterial";
import Editmaterial from "./components/pages/Editmaterial";
import Statistics from "./components/pages/Statistics";
import Dictionary from "./components/pages/Dictionary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/login"
        element={
          <EnsureGuest>
            <Login />
          </EnsureGuest>
        }
        exact
      />
      <Route path="/" element={<Landing />} exact />
      <Route
        element={
          <EnsureAuth>
            <HomeLayout />
          </EnsureAuth>
        }
        errorElement={<Error500 />}
      >
        <Route
          path="/home"
          loader={DashboardLoader}
          element={<Dashboard />}
          exact
        />
        <Route
          path="/wordlist"
          loader={wordListLoader}
          element={<WordList />}
          exact
        />
        <Route path="/addmaterial" element={<Addmaterial />} exact />
        <Route
          path="/readinglist"
          element={<Readinglist />}
          loader={materialsLoader}
          exact
        />
        <Route
          path="/materials/:id"
          loader={viewMaterialsLoader}
          element={<Viewmaterial />}
        ></Route>
        <Route
          path="/materials/edit/:id"
          loader={viewMaterialsLoader}
          element={<Editmaterial />}
        ></Route>
        <Route
          path="/statistics"
          element={<Statistics />}
          loader={chartDataLoader}
        ></Route>
        <Route path="/dictionary" element={<Dictionary />} exact></Route>
        <Route path="/404" element={<Error404 />} exact></Route>
        <Route path="/500" element={<Error500 />} exact></Route>
      </Route>
    </Route>,
  ),
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
