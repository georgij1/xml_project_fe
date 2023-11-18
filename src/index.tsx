import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {
    AuthForm,
    Header,
    Body,
    Footer,
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
                <Footer/>
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
            element: <div>
                <ClosePage/>
                <BodyLogout/>
                <Footer/>
            </div>
        },

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
            path: "/home/company/user/profile",
            element: <>
                <ClosePage/>
                <Profile/>
                <Footer/>
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
            element: <div>
                <ClosePage/>
                <BodyLogout/>
                <Footer/>
            </div>
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
                <Footer/>
            </>,
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
            element: <>
                <ClosePage/>
                <Profile/>
                <Footer/>
            </>
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
    new Title().title_all_page()

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
        },
        {
            path: "/logout",
            element: <div>
                <ClosePage/>
                <BodyLogout/>
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