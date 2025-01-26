import { TextField } from "@mui/material";
import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 25px;
  gap: 5px;
`;

export const InputField = styled(TextField)`
  width: 100%;

  & .MuiInputBase-root {
    background-color: #fff;
    position: relative;
  }

  & .MuiInputBase-root {
    border-radius: 8px;
  }

  input {
    padding: 15px;
    font-size: 16px;
    color: #000;
    width: 100%;
  }
`;

export const TextAreaField = styled.textarea`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #1b76d3;
    box-shadow: 0 0 2px rgba(27, 118, 211, 1);
  }
`;

export const Lable = styled.label`
  font-size: 20px;
  font-weight: 500px;
`;

export const Error = styled.p`
  position: absolute;
  bottom: -15px;
  color: #e02d52;
  font-size: 12px;
`;
