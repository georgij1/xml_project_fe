import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import "./App.css";
import {AuthForm, Header, Body, Footer, RegistrationForm} from "./components/export.components";

if (!localStorage.getItem('auth_token')) {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/auth" replace={true}/>
        },
        {
            path: "/auth",
            element: <AuthForm/>,
        },
        {
            path: "/registration",
            element: <div>
                <RegistrationForm/>
            </div>
        }
    ]);

    // @ts-ignore
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

else if (localStorage.getItem('auth_token')) {
    if (window.location.pathname === "/home") {
        // @ts-ignore
        document.querySelector('title').textContent = 'Домашняя страница'
        // @ts-ignore
        console.log(document.querySelector('title').textContent)
    }

    else {
        // @ts-ignore
        document.querySelector('title').textContent = 'Сервис по формированию заключений экспертизы в формате XML'
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/home" replace={true}/>
        },
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
}

else {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/error" replace={true}/>
        },
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
}