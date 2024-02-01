import Welcome from "./welcome/Welcome";
import "./App.css";
import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./not-found/NotFound";
import Shell from "./shell/Shell";
import { useAuth } from "./auth/use-auth";

const Products = lazy(() => import("./products/Products"));
const Login = lazy(() => import("./login/Login"));

type ProtectedRouteProps = {
  isAllowed: boolean;
  path?: string;
  children: React.ReactNode;
};

function ProtectedRoute({
  isAllowed = false,
  path = "/login",
  children,
}: ProtectedRouteProps) {
  if (isAllowed) {
    return children;
  }

  return <Navigate to={path} replace={true} />;
}

function App() {
  const [user] = useAuth();

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Shell />}>
          {/* <Route index element={<Welcome />} /> */}
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="products"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Products />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
