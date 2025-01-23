import { Routes, Route } from "react-router-dom";
import { routes } from "./lib";
import { CreateRoute } from "./lib/guards";
import Layout from "@/widjets/Layout";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map(CreateRoute)}
      </Route>
    </Routes>
  );
};
