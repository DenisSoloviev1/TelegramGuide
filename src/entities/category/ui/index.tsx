import React from "react";
import { CategoryCard } from "./style";
import { ICategory } from "../model";
import { baseUrl } from "@/shared/config";

export const Category: React.FC<ICategory> = ({ id, name, imageId }) => {
  return (
    <CategoryCard href={`/category/${id}`} id={`${id}`}>
      <img src={`${baseUrl}/media/get/${imageId}`} alt="" />

      <span>{name}</span>
    </CategoryCard>
  );
};
