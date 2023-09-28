import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import "./App.css";
import {
    AuthForm,
    Header,
    Body,
    Footer,
    RegistrationForm,
    EnterCompany,
    RegCompany,
    Profile,
    SupportHome,
    SettingsHome,
    ClosePage
} from "./components/export.components";

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

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

else if (localStorage.getItem('auth_token')) {
    if (window.location.pathname === "/home") {
        const a = document.querySelector('title')

        if (a) {
            a.textContent = 'Домашняя страница'
        }
    }

    else {
        // @ts-ignore
        document.querySelector('title').textContent = 'Сервис по формированию заключений экспертизы в формате XML'
    }

    // @ts-ignore
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
        },
        {
            path: "/home/enter_company",
            element: <div>
                <ClosePage/>
                <EnterCompany/>
                <Footer/>
            </div>
        },
        {
            path: "/home/reg_company",
            element: <div>
                <ClosePage/>
                <RegCompany/>
                <Footer/>
            </div>
        },
        {
            path: "/home/profile",
            element: <div>
                <Profile/>
                <Footer/>
            </div>
        },
        {
            path: "/home/support",
            element: <div>
                <ClosePage/>
                <SupportHome/>
                <Footer/>
            </div>
        },
        {
            path: "/home/settings",
            element: <div>
                <ClosePage/>
                <SettingsHome/>
                <Footer/>
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