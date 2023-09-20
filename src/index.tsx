import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthForm from "./forms/AuthForm";
import "./App.css"
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";
import RegistrationForm from "./forms/RegistrationForm";

if (!localStorage.getItem('auth_token')) {
    const router = createBrowserRouter([
        {
            path: "/auth",
            element: <AuthForm/>,
        },
        {
            path: "/registration",
            element: <RegistrationForm/>
        }
    ]);

    // @ts-ignore
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );

    console.log(window.location.pathname)

    if (window.location.pathname === "/") {
        window.open(`/auth`, '_self')
    }
}

else if (localStorage.getItem('auth_token')) {
    const router = createBrowserRouter([
        {
            path: "/home",
            element: <div>
                <Header/>
                <Body/>
                <Footer/>
            </div>,
        }
    ]);

    // @ts-ignore
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );

    if (window.location.pathname !== "/home") {
        window.open(`/home`)
    }
}

else {
    const router = createBrowserRouter([
        {
            path: "/error",
            element: <div>В системе произошла ошибка</div>,
        }
    ]);

    // @ts-ignore
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );

    if (window.location.pathname !== "/error") {
        window.open(`/error`)
    }
}