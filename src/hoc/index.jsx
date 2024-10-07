import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Container from "./Container";
import Main from "../pages/Main/Main";

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Container />,
            children: [
                {
                    index: true,
                    element: <Main />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;
