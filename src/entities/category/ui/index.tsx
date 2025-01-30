import React from "react";
import { CategoryCard, CategoryImage } from "./style";
import { ICategory } from "../model";
import { baseUrl } from "@/shared/config";

export const Category: React.FC<ICategory> = (category) => {
  return (
    <CategoryCard href={`/category/${category.id}`} id={`${category.id}`}>
      <CategoryImage src={`${baseUrl}/media/get/${category.imageId}`} alt="" />

      <span>{category.name}</span>
    </CategoryCard>
  );
};
