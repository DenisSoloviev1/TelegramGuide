import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ModalWindow, Flex, Input, CustomButton } from "@/shared/ui";
import toast from "react-hot-toast";
import {
  addCategory,
  deleteCategory,
  ICategory,
  updateCategory,
} from "@/entities/category";
import { isMobile } from "@/shared/lib";
import { PageText } from "@/pages/style";

interface CategoryModalProps {
  mode: "add" | "update" | "delete";
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  сategoryData?: ICategory; // Для редактирования и удаления
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  mode,
  show,
  onClose,
  onSuccess,
  сategoryData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    defaultValues: сategoryData || {},
  });

  const handleSuccess = () => {
    onSuccess?.(); // Вызываем onSuccess, если он передан
    onClose(); // Закрываем модалку
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setValue("base64", base64String.split(",")[1], {
          shouldValidate: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit: SubmitHandler<ICategory> = async (data) => {
    if (!data.base64 && mode === "add") {
      toast.error("Изображение обязательно");
      return;
    }

    try {
      if (mode === "add") {
        await toast.promise(addCategory(data), {
          loading: "Создание категории...",
          success: "Категория создана",
          error: "Категория не создана",
        });
      } else {
        await toast.promise(updateCategory(data, сategoryData?.id), {
          loading: "Редактирование категории...",
          success: "Категория отредактирована",
          error: "Категория не редактирована",
        });
      }
      handleSuccess();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await toast.promise(deleteCategory(сategoryData?.id), {
        loading: "Удаление категории...",
        success: "Категория удалена",
        error: "Категория не удалена",
      });
      handleSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalWindow
      show={show}
      onClick={onClose}
      width={isMobile ? "90%" : "500px"}
    >
      {mode === "add" || mode === "update" ? (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex $direction="column" $align={"center"}>
            <Input
              label="Название"
              {...register("name", { required: "Название обязательно" })}
              defaultValue={сategoryData?.name}
              error={errors.name?.message}
            />
            <Input
              label="Изображение"
              type="file"
              onChange={handleFileChange} // Обработчик изменения файла
              error={errors.base64?.message}
            />

            <CustomButton type="submit">
              {mode === "add" ? "Создать" : "Редактировать"}
            </CustomButton>
          </Flex>
        </form>
      ) : (
        <Flex $align="center" $gap={20}>
          <PageText $fontSize={25}>Подтвердите действие</PageText>

          <Flex $direction="row" $justify="center" $gap={30}>
            <CustomButton type="button" onClick={handleDelete}>
              Удалить
            </CustomButton>

            <CustomButton type="button" onClick={onClose}>
              Отмена
            </CustomButton>
          </Flex>
        </Flex>
      )}
    </ModalWindow>
  );
};

export default CategoryModal;
