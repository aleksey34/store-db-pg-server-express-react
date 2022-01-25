import Admin from "./pages/Admin";
import {
    ADMIN_PATH,
    BASKET_PATH,
    DEVICE_PATH,
    LOGIN_PATH,
    REGISTRATION_PATH,
    SHOP_PATH,
    DEFAULT_PATH,
} from './utils/constants';
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
// import DefaultPage from "./pages/DefaultPage";
import { Navigate } from 'react-router-dom';
export  const authRoutes = [
    {
        path: ADMIN_PATH,
        Component: Admin
    },
    {
        path: BASKET_PATH,
        Component: Basket
    }
];

export  const publicRoutes = [
    {
        path: SHOP_PATH,
        Component: Shop
    },
    {
        path: LOGIN_PATH,
        Component: Auth
    },
    {
        path: REGISTRATION_PATH,
        Component: Auth
    },
    {
        path: `${DEVICE_PATH}/:id`,
        Component: DevicePage
    },

];
export const defaultRoute = [
    {
        path: DEFAULT_PATH,
        redirectPath:SHOP_PATH,
        Component: Navigate
    }
]