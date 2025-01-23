import React, { ReactNode } from "react";
import { Button } from "./style";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  children?: ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  children,
}) => {
  return (
    <Button onClick={onClick}>
      {text}
      {children}
    </Button>
  );
};
