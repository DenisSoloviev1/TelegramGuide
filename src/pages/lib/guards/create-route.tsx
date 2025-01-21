import React from 'react';
import { Route } from 'react-router-dom';
import { IRoute } from '@/shared/types';
import { PrivateRoute } from './private-route';

export const CreateRoute: React.FC<IRoute> = ({ component, path, id, ...route }) => {
  return (
    <Route
      path={path}
      key={id}
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
