import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/widjets/Layout";
import { Path } from "@/shared/constants";

const Auth = lazy(() => import("./Auth"));
const NotFound = lazy(() => import("./NotFound"));
const Home = lazy(() => import("./Home"));
const Posts = lazy(() => import("./Posts"));
const PostDetails = lazy(() => import("./PostDetails"));
const CategoryDetails = lazy(() => import("./CategoryDetails"));

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.AUTH} element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route path={Path.NOT_FOUND} element={<NotFound />} />
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.POSTS} element={<Posts />} />
        <Route path={Path.POST_DETAILS} element={<PostDetails />} />
        <Route path={Path.CATEGORY_DETAILS} element={<CategoryDetails />} />
      </Route>
    </Routes>
  );
};
