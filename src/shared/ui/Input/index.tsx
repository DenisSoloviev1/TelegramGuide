import { TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import {
  InputContainer,
  InputField,
  TextAreaField,
  Lable,
  Error,
} from "./style";

interface Props extends Omit<TextFieldProps, "variant" | "error"> {
  label: string;
  error?: string;
  type?: string; // Добавлено для поддержки type === "textarea"
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({ label, error, type, ...props }: Props, ref) => {
    return (
      <InputContainer>
        <Lable>{label}</Lable>

        {type === "textarea" ? (
          <TextAreaField
            ref={ref as React.Ref<HTMLTextAreaElement>} // Прямое указание типа рефа
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <InputField
            type={type}
            inputRef={ref as React.Ref<HTMLInputElement>} // Прямое указание типа рефа
            error={!!error}
            {...props}
          />
        )}

        {error && <Error>{error}</Error>}
      </InputContainer>
    );
  }
);

export { InputField, Input };
