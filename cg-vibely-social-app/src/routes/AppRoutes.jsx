import {Route, Routes} from "react-router-dom";
import publicRoutes from "../data/RoutesData";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login"
import {GoogleOAuthProvider} from "@react-oauth/google";
import {CLIENT_ID} from "~/app/constants.js";


function AppRoutes() {
    return (
        <Routes>
            {
                publicRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout;
                    return <Route
                        key={index}
                        path={route.path}
                        element={
                            Layout === null
                                ? <Page/>
                                : <Layout path={route.path}><Page/></Layout>
                        }/>

                })
            }
            <Route path="/login" element={
                    <Login/>
            }/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default AppRoutes