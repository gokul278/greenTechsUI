import React from "react";
import {
  Navigate,
  // Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "../Login/Login";
import { AuthProvider } from "./AuthContext";
import RoleProtectedRoute from "./RoleProtectedRoute";
import MasterHeader from "./MasterHeader";
import RegisterStudent from "../Regsiter/RegisterStudent";
// import AdminMail from "../Mail/AdminMail";
import ScrollToTop from "@/lib/ScrollToTop";
import Unauthorized from "../Unauthorized/Unauthorized";
import Student from "../Student/Student";
import Subtrainer from "../Subtrainer/Subtrainer";
import Filter from "../Filter/Filter";
import Groups from "../Groups/Groups";
import Report from "../Reports/Report";
import Recording from "../Recordings/Recording";

export interface AppRoute {
  path?: string; // Made path optional
  element: React.ReactNode;
  index?: boolean;
  children?: AppRoute[];
  allowedRoles?: string[]; // Only for RoleProtectedRoute
  redirectTo?: string; // For Navigate component
}

interface MainRoutesProps {}

const MainRoutes: React.FC<MainRoutesProps> = () => {
  const adminRoutes: AppRoute[] = [
    { index: true, element: <Navigate to="register" replace /> },
    { path: "register", element: <RegisterStudent /> },
    // { path: "mail", element: <AdminMail /> },
  ];

  const headtrainerRoutes: AppRoute[] = [
    { index: true, element: <Navigate to="student" replace /> },
    { path: "student", element: <Student /> },
    { path: "register", element: <RegisterStudent /> },
    { path: "subtrainer", element: <Subtrainer /> },
    { path: "filter", element: <Filter /> },
    { path: "groups", element: <Groups /> },
    { path: "reports", element: <Report /> },
    { path: "recordings", element: <Recording /> },
  ];

  const renderRoutes = (routes: AppRoute[]) => {
    return routes.map((route, index) => {
      const Element = route.element;
      if (route.allowedRoles) {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <RoleProtectedRoute allowedRoles={route.allowedRoles}>
                {Element}
              </RoleProtectedRoute>
            }
          >
            {route.children && renderRoutes(route.children)}
          </Route>
        );
      } else if (route.redirectTo) {
        return (
          <Route
            key={index}
            path={route.path}
            element={<Navigate to={route.redirectTo} replace />}
          />
        );
      } else if (route.children) {
        return (
          <Route key={index} path={route.path} element={Element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return (
        <Route
          key={index}
          path={route.path}
          element={Element}
          index={route.index}
        />
      );
    });
  };

  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" index element={<Login />} />
          <Route path="/unauthorized" index element={<Unauthorized />} />

          <Route
            path="/admin"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <MasterHeader />
              </RoleProtectedRoute>
            }
          >
            {renderRoutes(adminRoutes)}
          </Route>

          <Route
            path="/headtrainer"
            element={
              <RoleProtectedRoute allowedRoles={["headtrainer"]}>
                <MasterHeader />
              </RoleProtectedRoute>
            }
          >
            {renderRoutes(headtrainerRoutes)}
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default MainRoutes;
