import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { authRoutes, publicRoutes } from "../routers/index.jsx"
import { Context } from "../main"
import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    
    return (
      <Routes>
          {user.isAuth && authRoutes.map(({path, element}) =>
            <Route key={path} path={path} element={element}/>     
          )}
           {publicRoutes.map(({path, element}) =>
            <Route key={path} path={path} element={element}/>
          )}
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  })
  
export default AppRouter;