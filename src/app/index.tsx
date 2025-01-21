import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { RouterProvider } from "./providers";
import styled from "styled-components";
import { Routing } from "@/pages";
import "./style.css";

const Progress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const App: React.FC = () => {
  return (
    <RouterProvider>
      <Suspense fallback={<Progress />}>
        <Routing />
      </Suspense>
    </RouterProvider>
  );
};

export default App;
