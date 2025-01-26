import { StrictMode, Fragment} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/app";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

createRoot(document.getElementById("root")!).render(
  <Fragment> {/* Замените StrictMode на Fragment */}
    <App />
  </Fragment>
);
