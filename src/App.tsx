import { RouterProvider } from "react-router";
import { router } from "./configs/routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
