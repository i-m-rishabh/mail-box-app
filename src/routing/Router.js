import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CreateMail from "../pages/CreateMail";
import Inbox from "../pages/Inbox";

const router = createBrowserRouter([
    {path:'/', element: <App />},
    {path:'/login', element: <Login />},
    {path:'/signup', element: <Signup />},
    {path:'/home', element: <div>welcome to home</div>},
    {path:'/create-mail', element: <CreateMail />},
    {path:'/inbox', element: <Inbox />},
]);

const Router = (props) => {
    return(
        <RouterProvider router={router}>
            {props.children}
        </RouterProvider>
    )
}

export default Router;