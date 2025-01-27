import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/widjets/Layout";
import { useAuthStore } from "@/entities/user";
import { Path } from "@/shared/constants";
import { RolesDict } from "@/shared/types";

const Auth = lazy(() => import("./Auth"));
const Home = lazy(() => import("./Home"));
const Posts = lazy(() => import("./Posts"));
const NotFound = lazy(() => import("./NotFound"));

const PostDetails = lazy(() => import("./PostDetails"));

export const Routing = () => {
  const { isAuth, role } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.POSTS} element={<Posts />} />
        <Route path={Path.POSTDETAILS} element={<PostDetails />} />
        <Route
          path={Path.AUTH}
          element={isAuth && role === RolesDict.ADMIN ? <Auth /> : <NotFound />}
        />
        <Route path={Path.NOTFOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
