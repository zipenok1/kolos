import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { authRoutes, publicRoutes } from "../routers/index"
import { Context } from "../main"
import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    
    return (
      <Routes>
          {user.isAuth && authRoutes.map(({path, component}) =>
            <Route key={path} path={path} Component={component} exact/>     
          )}
           {publicRoutes.map(({path, component}) =>
            <Route key={path} path={path} Component={component} exact/>
          )}
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  })
  
export default AppRouter;