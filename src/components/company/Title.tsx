import {Messages} from "../message/Message";

export class Title {
    title_all_page() {
        if (window.location.pathname === "/home") {
            document.title = 'Дом | Сервис xml'
        }

        else if (window.location.pathname === "/logout") {
            document.title = 'Выход из системы | Сервис xml'
        }

        else if (window.location.pathname === "/auth") {
            document.title = 'Авторизация | Сервис xml'
        }

        else if (window.location.pathname === "/registration") {
            document.title = 'Регистрация | Сервис xml'
        }

        else if (window.location.pathname === "/home/company") {
            document.title = 'Дом компания | Сервис xml'
        }

        else if (window.location.pathname === "/home/company/upload/file") {
            document.title = 'Загрузка файла | Сервис xml'
        }

        else if (window.location.pathname === "/home/company/create/file") {
            document.title = 'Создание файла | Сервис xml'
        }

        else if (window.location.pathname === "/home/company/settings") {
            document.title = 'Настройки компании | Сервис xml'
        }

        else if (window.location.pathname === "/home/company/support") {
            document.title = 'Поддержка компании | Сервис xml'
        }

        else if (window.location.pathname === "/home/company/profile") {
            document.title = 'Профиль компании | Сервис xml'
        }

        else if (window.location.pathname === "/home/enter_company") {
            document.title = 'Вход в компанию | Сервис xml'
        }

        else if (window.location.pathname === "/home/reg_company") {
            document.title = 'Регистрация компании | Сервис xml'
        }

        else if (window.location.pathname === "/home/profile") {
            document.title = 'Ваш профиль | Сервис xml'
        }

        else if (window.location.pathname === "/home/settings") {
            document.title = 'Ваши настройки | Сервис xml'
        }

        else if (window.location.pathname === "/error") {
            document.title = 'Ошибка в системе | Сервис xml'
        }

        else {
            document.title = 'Сервис по формированию заключений экспертизы в формате XML'
        }
    }
}