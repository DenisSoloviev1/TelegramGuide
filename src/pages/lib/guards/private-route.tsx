import { ComponentType, FC } from "react";
import { useAuthStore } from "@/entities/user";
import { Roles } from "@/shared/types";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

interface IPrivateRoute {
  element: ComponentType;
  isPublic: boolean;
  roles: Roles[];
}

export const PrivateRoute: FC<IPrivateRoute> = ({
  element: RouteComponent,
  isPublic,
  roles,
}) => {
  const { isAuth, role } = useAuthStore();

  // Если страница публичная, рендерим её без проверок
  if (isPublic) {
    return <RouteComponent />;
  }

  // Если пользователь не авторизован, перенаправляем его на страницу авторизации
  if (!isAuth) {
    return <Auth />;
  }

  // Если пользователь авторизован, но его роль не соответствует разрешённым ролям, показываем страницу "Not Found"
  if (role && !roles.includes(role as Roles)) {
    return <NotFound />;
  }

  // Если пользователь авторизован и его роль совпадает с одной из разрешенных, рендерим компонент страницы
  return <RouteComponent />;
};
