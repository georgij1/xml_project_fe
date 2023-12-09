import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {
    AuthForm,
    Header,
    Body,
    RegistrationForm,
    UploadFile, CreateFile,
    ListFiles
} from "./components/export.components.jsx";
import {
    EnterCompany,
    RegCompany,
    Profile,
    SupportHome,
    SettingsHome,
    ClosePage,
    CompanyHeader,
    NotFound, BodyLogout, ProfileCompany
} from "./pages/export.pages.jsx"
import {Title} from "./components/company/Title"

if (!localStorage.getItem('auth_token')) {
    new Title().title_all_page()

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
            element: <RegistrationForm/>
        },
        {
            path: "*",
            element: <>
                <NotFound/>
            </>
        }
    ]);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

else if (localStorage.getItem('NameCompany') && localStorage.getItem('auth_token')) {
    new Title().title_all_page()

    const router = createBrowserRouter([
        {
            path: "/logout",
            element: <>
                <ClosePage/>
                <BodyLogout/>
            </>
        },

        {
            path: "/",
            element: <Navigate to="/home/company" replace={true}/>
        },

        {
            path: "/home/company",
            element: <>
                <CompanyHeader/>
                <ListFiles/>
            </>
        },

        {
            path: "/home/company/upload/file",
            element: <>
                <ClosePage/>
                <UploadFile/>
            </>
        },
        {
            path: "/home/company/create/file",
            element: <>
                <ClosePage/>
                <CreateFile/>
            </>
        },
        {
            path: "/home/company/settings",
            element: <>
                <ClosePage/>
                <SettingsHome/>
            </>
        },
        {
            path: "/home/company/support",
            element: <>
                <ClosePage/>
                <SupportHome/>
            </>
        },
        {
            path: "*",
            element: <>
                <NotFound/>
            </>
        },
        {
            path: "/home/company/user/profile",
            element: <>
                <Profile/>
            </>
        },
        {
            path:"/home/company/company/profile",
            element: <>
                <ClosePage/>
                <ProfileCompany/>
            </>
        }
    ])


    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

else if (localStorage.getItem('auth_token')) {
    new Title().title_all_page()

    const router = createBrowserRouter([
        {
            path: "/logout",
            element: <>
                <ClosePage/>
                <BodyLogout/>
            </>
        },
        {
            path: "/",
            element: <Navigate to="/home" replace={true}/>
        },
        {
            path: "/home",
            element: <>
                <Header/>
                <Body/>
            </>,
        },
        {
            path: "/home/enter_company",
            element: <>
                <ClosePage/>
                <EnterCompany/>
            </>
        },
        {
            path: "/home/reg_company",
            element: <>
                <ClosePage/>
                <RegCompany/>
            </>
        },
        {
            path: "/home/profile",
            element: <>
                <Profile/>
            </>
        },
        {
            path: "/home/support",
            element: <>
                <ClosePage/>
                <SupportHome/>
            </>
        },
        {
            path: "/home/settings",
            element: <>
                <ClosePage/>
                <SettingsHome/>
            </>
        },
        {
            path: "*",
            element: <>
                <NotFound/>
            </>
        }
    ]);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

else {
    new Title().title_all_page()

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/error" replace={true}/>
        },
        {
            path: "/error",
            element: <>В системе произошла ошибка</>,
        },
        {
            path: "*",
            element: <>
                <NotFound/>
            </>
        },
        {
            path: "/logout",
            element: <>
                <ClosePage/>
                <BodyLogout/>
            </>
        }
    ]);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}