import { Route, Routes } from "react-router-dom";
import { routes, type TRoutes } from "./routes";
import { NotFoundPage } from "@/pages";

export default function Router() {
  return (
    <Routes>
      {routes.map(({ path, layout, children }: TRoutes) => (
        <Route key={path} path={path} element={layout}>
          {children.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
