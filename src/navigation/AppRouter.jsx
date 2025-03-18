import { PublicRoutes } from "components/common/AuthChecker";
import { RequireAuth } from "components/common/AuthChecker";

const { lazy, Suspense } = require("react");
const { Routes, Route } = require("react-router-dom");
const { allRoutes } = require("./AllRoutes");

// const Dashboard= lazy(()=>import("../views/admin/default"))
const Login = lazy(()=>import("../views/auth/SignIn"))

const AppRouter = ()=>{
  return (
    <Suspense fallback={"...Loading"}>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/auth/signin" element={<Login />} />
        </Route>
        {allRoutes.map((route, index) =>
          route?.submodules?.length > 0 ? (
            route.submodules.map((subRoute, subIndex) => (
              <Route
                key={index}
                element={<RequireAuth componentTitle={subRoute.title} />}
              >
                <Route
                  key={subIndex}
                  path={subRoute.path}
                  element={subRoute.element}
                />
              </Route>
            ))
          ) : (
            <Route
              key={index}
              element={<RequireAuth componentTitle={route.title} />}
            >
              <Route path={route.path} element={route.element} />
            </Route>
          )
        )}
      </Routes>
    </Suspense>
  );
}

export default AppRouter;