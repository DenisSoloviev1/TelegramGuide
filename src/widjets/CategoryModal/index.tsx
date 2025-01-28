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
  сategoryData?: ICategory; // Для редактирования и удаления
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  mode,
  show,
  onClose,
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
    try {
      if (mode === "add") {
        await addCategory(data);
        toast.success("Категория создана");
      } else {
        await updateCategory(data, сategoryData?.id);
        toast.success("Категория отредактирован");
      }
      onClose();
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка, попробуйте снова");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(сategoryData?.id);
      toast.success("Категория удалена");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при удалении категории");
    }
  };

  return (
    <ModalWindow
      show={show}
      onClick={onClose}
      width={isMobile ? "90%" : "400px"}
    >
      {mode === "add" || mode === "update" ? (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex $direction="column" $align={"center"}>
            <Input
              label="Название"
              {...register("name", { required: "Название обязателено" })}
              error={errors.name?.message}
            />
            <Input
              label="Изображение"
              type="file"
              onChange={handleFileChange}
              error={errors.base64?.message}
            />

            <CustomButton type="submit">
              {mode === "add" ? "Создать" : "Редактировать"}
            </CustomButton>
          </Flex>
        </form>
      ) : (
        <Flex $align="center" $gap={20}>
          <PageText $fontSize={25}>
            Вы уверены, что хотите удалить эту категорию?
          </PageText>

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
