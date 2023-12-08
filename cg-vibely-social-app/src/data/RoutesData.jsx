import MainLayout from "../layouts/MainLayout";
import ChatLayout from "../layouts/ChatLayout/index.jsx";
import Feeds from "../pages/Feeds"
import Login from "../pages/Login"
import Register from "../pages/Register";
import PersonalPage from "~/pages/PersonalPage/index.jsx";
import FriendPage from "~/pages/FriendPage/index.jsx";
import Chat from "~/pages/Chat/index.jsx";
import Friends from "~/pages/Friends";
import Forgot from "~/pages/Forgot";
import SearchPage from "~/pages/SearchPage/index.jsx";

export const publicRoutes = [
    {path: '/', component: Feeds, layout: MainLayout},
    {path: '/profile', component: PersonalPage, layout: MainLayout},
    {path: `/profile/:id`, component: FriendPage, layout: MainLayout},
    {path: '/login', component: Login, layout: null},
    {path: '/register', component: Register, layout: null},
    {path: '/friends', component: Friends, layout: MainLayout},
    {path: '/messenger', component: Chat, layout: ChatLayout},
    {path: '/forgot', component: Forgot, layout: null},
    {path: '/search', component: SearchPage, layout: MainLayout}
]

export default publicRoutes;