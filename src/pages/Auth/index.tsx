import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { CustomButton, Flex, Input } from "@/shared/ui";
import { AuthContainer } from "../style";
import { authUser, IAuth, useAuthStore } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import { Path } from "@/shared/constants";

export const Auth: React.FC = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuth>({});

  const handleFormSubmit: SubmitHandler<IAuth> = async (data) => {
    try {
      const response = await authUser(data);
      setAuth(response.auth, response.role);
      toast.success("Вы авторизовались, перенаправляем");
      reset();
      setTimeout(() => navigate(Path.HOME), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Ошибка, попробуйте снова");
    }
  };

  return (
    <>
      <Toaster />

      <AuthContainer>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex $align="center" $gap={10}>
            <h3>Авторизоваться</h3>

            <Input
              label="Логин"
              type="text"
              {...register("login", { required: "Логин обязателен" })}
              error={errors.login?.message}
            />

            <Input
              label="Пароль"
              type="password"
              {...register("password", { required: "Пароль обязателен" })}
              error={errors.password?.message}
            />

            <CustomButton type="submit">войти</CustomButton>
          </Flex>
        </form>
      </AuthContainer>
    </>
  );
};

export default Auth;
