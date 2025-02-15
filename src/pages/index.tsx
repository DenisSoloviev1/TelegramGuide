import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/widjets/Layout";
import { Path } from "@/shared/constants";

const NotFound = lazy(() => import("./NotFound"));
const Home = lazy(() => import("./Home"));
const Auth = lazy(() => import("./Auth"));
const Search = lazy(() => import("./Search"));
const Posts = lazy(() => import("./Posts"));
const PostDetails = lazy(() => import("./PostDetails"));
const CategoryDetails = lazy(() => import("./CategoryDetails"));
const ChannelDetails = lazy(() => import("./ChannelDetails"));

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.AUTH} element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route path={Path.NOT_FOUND} element={<NotFound />} />
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.SEARCH} element={<Search />} />
        <Route path={Path.POSTS} element={<Posts />} />
        <Route path={Path.POST_DETAILS} element={<PostDetails />} />
        <Route path={Path.CATEGORY_DETAILS} element={<CategoryDetails />} />
        <Route path={Path.CHANNEL_DETAILS} element={<ChannelDetails />} />
      </Route>
    </Routes>
  );
};
