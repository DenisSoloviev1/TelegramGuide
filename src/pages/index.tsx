import { Routes } from "react-router-dom";
import { routes } from "./lib";
import { CreateRoute } from "./lib/guards";

export const Routing = () => {
  return <Routes>{routes.map(CreateRoute)}</Routes>;
};
