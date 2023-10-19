import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import {
    createBrowserRouter,
    Navigate,
    RouterProvider
} from "react-router-dom";
import {
    AuthForm,
    Header,
    Body,
    Footer,
    RegistrationForm,
    UploadFile, CreateFile
    // @ts-ignore
} from "./components/export.components.jsx";
import {
    EnterCompany,
    RegCompany,
    Profile,
    SupportHome,
    SettingsHome,
    ClosePage,
    CompanyHeader,
    NotFound
    // @ts-ignore
} from "./pages/export.pages.jsx"
import "./App.css"
import {ListFiles} from "./components/company/ListFiles/ListFiles";

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
        },
        {
            path: "*",
            element: <div>
                <NotFound/>
                <Footer/>
            </div>
        }
    ]);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

else if (localStorage.getItem('NameCompany') && localStorage.getItem('auth_token')) {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/home/company" replace={true}/>
        },

        {
            path: "/home/company",
            element: <div>
                <CompanyHeader/>
                <ListFiles/>
                <Footer/>
            </div>
        },

        {
            path: "/home/company/upload/file",
            element: <div>
                <ClosePage/>
                <UploadFile/>
                <Footer/>
            </div>
        },
        {
            path: "/home/company/create/file",
            element: <div>
                <ClosePage/>
                <CreateFile/>
                <Footer/>
            </div>
        },
        {
            path: "/home/company/settings",
            element: <div>
                <ClosePage/>
                <SettingsHome/>
                <Footer/>
            </div>
        },
        {
            path: "/home/company/support",
            element: <div>
                <ClosePage/>
                <SupportHome/>
                <Footer/>
            </div>
        },
        {
            path: "*",
            element: <div>
                <NotFound/>
                <Footer/>
            </div>
        },
        {
            path: "/home/company/profile",
            element: <div>
                <Profile/>
                <Footer/>
            </div>
        }
    ])


    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

else if (localStorage.getItem('auth_token')) {
    let title = document.querySelector('title')

    if (window.location.pathname === "/home") {
        // @ts-ignore
        title.textContent = 'Домашняя страница'
    }

    else {
        // @ts-ignore
        title.textContent = 'Сервис по формированию заключений экспертизы в формате XML'
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
        },
        {
            path: "*",
            element: <div>
                <NotFound/>
                <Footer/>
            </div>
        }
    ]);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
        },
        {
            path: "*",
            element: <div>
                <NotFound/>
                <Footer/>
            </div>
        }
    ]);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}