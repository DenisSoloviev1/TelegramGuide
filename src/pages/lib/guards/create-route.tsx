import React from "react";
import { Route } from "react-router-dom";
import { IRoute } from "@/shared/types";
import { PrivateRoute } from "./private-route";

export const CreateRoute: React.FC<IRoute> = ({
  id,
  index,
  path,
  component,
  ...route
}) => {
  return (
    <Route
      key={id}
      index={index}
      // path={path}
      path={index ? undefined : path}
      element={
        <PrivateRoute
          roles={route.roles}
          element={component}
          isPublic={route.isPublic}
        />
      }
      {...route}
    />
  );
};
