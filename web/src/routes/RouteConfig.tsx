import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import stores, { StoreContextProvider } from "../stores/stores";
import Default from "../layouts/Default/Default";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Project from "../pages/project/Project";
import ProjectSearch from "../pages/project/ProjectSearch";

const RouteConfig: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/login");
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
                  <Route path="/dashboard" element={<Dashboard />} />

                  <Route path="/project" element={<Project />} />
                  <Route
                    path="/project/outbdg-search"
                    element={<ProjectSearch />}
                  />
                  <Route
                    path="/project/inbdg-search"
                    element={<ProjectSearch />}
                  />

                  <Route path="/import" element={<Dashboard />} />
                  <Route path="/authorization" element={<Dashboard />} />
                  <Route path="/admin" element={<Dashboard />} />

                  {/* <Route element={<FarmerProtectedRoute user={authorize} />}> */}
                  {/* <Route path="/bwrf01-1" element={<BWRF01_1 />} /> */}
                  {/* </Route> */}
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
