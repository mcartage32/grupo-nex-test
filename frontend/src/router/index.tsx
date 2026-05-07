import { Spin } from "antd";
import { Suspense, type JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import Home from "@/layout/Home";

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <Routes>
          <Route element={<Home />} path="/">
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              >
                {route.children?.map((child) => (
                  <Route
                    path={child.path}
                    element={<child.component />}
                    key={`${route.path}/${child.path}`}
                  />
                ))}
              </Route>
            ))}
          </Route>
          <Route path="*" element={<div>Pagina no encontrada</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
