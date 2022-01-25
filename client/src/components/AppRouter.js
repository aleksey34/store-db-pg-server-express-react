import React, {useContext} from 'react';
import {
    Routes ,
    Route ,
    // Navigate
} from  'react-router-dom';
// import {DEFAULT_PATH} from "../utils/constants";
import {authRoutes , publicRoutes , defaultRoute } from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer( () => {
    const {user} = useContext(Context);

        const applyRoutes = (routesArr)=>{
            return (
                routesArr.map(({ path , Component, redirectPath })=> {
                    return !redirectPath
                        ?  <Route key={path} path={path} element={<Component/>} exact/>
                        :  <Route key={path} path={path} element={<Component to={redirectPath}/>} exact/>
                    }
                )
            )
        }

        return (
            <Routes>
                {user.isAuth && applyRoutes(authRoutes)}
                {applyRoutes(publicRoutes)}
                {applyRoutes(defaultRoute)}
            </Routes>
        );
    }
);
export default AppRouter;