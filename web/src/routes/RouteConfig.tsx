import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import stores, { StoreContextProvider } from "../stores/stores";
import Default from "../layouts/Default/Default";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Project from "../pages/project/Project";
import ProjectSearch from "../pages/project/ProjectSearch";
import ProjectList from "../pages/project/ProjectList";
import ProjectDetail from "../pages/project/ProjectDetail";
import AuthorizationSearch from "../pages/Authorization/AuthorizationSearch";
import AuthorizationList from "../pages/Authorization/AuthorizationList";
import AdminList from "../pages/Admin/AdminList";
import InProjectSearch from "../pages/project/InProjectSearch";
import InProjectList from "../pages/project/InProjectList";
import InProjectDetail from "../pages/project/InProjectDetail";
import Import from "../pages/Import/ImportList";
import ImportCreate from "../pages/Import/ImportCreate";
import ImportDetail from "../pages/Import/ImportDetail";
import ProtectedRoute from "./ProtectedRoute";

const RouteConfig: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/dashboard");
  }, []);

  return (
    <>
      <StoreContextProvider value={stores}>
        <Suspense fallback={<>loading...</>}>
          <AnimatePresence>
            <Routes location={location} key={location.pathname}>
              <>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<Default />}>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/project" element={<Project />} />
                    <Route
                      path="/project/outbdg-search"
                      element={<ProjectSearch />}
                    />
                    <Route
                      path="/project/inbdg-search"
                      element={<InProjectSearch />}
                    />
                    <Route path="/project/list" element={<ProjectList />} />
                    <Route
                      path="/project/:id/:code"
                      element={<ProjectDetail />}
                    />

                    <Route
                      path="/project/inbdg-list"
                      element={<InProjectList />}
                    />
                    <Route
                      path="/project/inbdg/:id/:code"
                      element={<InProjectDetail />}
                    />

                    <Route path="/import" element={<Import />} />
                    <Route path="/import/create" element={<ImportCreate />} />
                    <Route path="/import/edit/:id" element={<ImportDetail />} />

                    <Route
                      path="/authorization"
                      element={<AuthorizationSearch />}
                    />
                    <Route
                      path="/authorization/list"
                      element={<AuthorizationList />}
                    />

                    <Route path="/admin" element={<AdminList />} />

                    {/* <Route element={<FarmerProtectedRoute user={authorize} />}> */}
                    {/* <Route path="/bwrf01-1" element={<BWRF01_1 />} /> */}
                    {/* </Route> */}
                  </Route>
                </Route>
              </>
            </Routes>
          </AnimatePresence>
        </Suspense>
      </StoreContextProvider>
    </>
  );
};

export default RouteConfig;
