import "./Logout.css"
import {useState} from "react";

export const Logout = () => {
    const [time, setTime] = useState('')
    const [menu, setMenu] = useState<boolean>(false)

    const choose_time=localStorage.getItem('MessageLogout')

    // @ts-ignore
    const interval = (countDown) => {
        const x = setInterval(() => {
            const now = new Date().getTime()
            const distance = countDown-now
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTime(`${hours+"h "+minutes + "m "+seconds+"s "}`)
            if (distance < 0) {
                clearInterval(x);
                setTime('Время вышло')
                setTimeout(() => logout(), 10000)
            }
        }, 1000)
    }

    const count_call = () => {
        if (new Date().getMonth()+1===1) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("January"+Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===2) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("February"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===3) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("March"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===4) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("April"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===5) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("May"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===6) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("June"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===7) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("July"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===8) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("August"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===9) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("September"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===10) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("October"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===11) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("November"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }

        else if (new Date().getMonth()+1===11) {
            const Day = new Date().getDate()
            const year = new Date().getFullYear()
            const countDown = new Date("December"+ Day+", "+year+" "+choose_time).getTime()
            interval(countDown)
        }
    }

    count_call()

    const logout = () => window.open(`/logout`, '_self')

    const close_timer_logout = () => {
        console.log('click close timer logout')
        setMenu(true)
    }

    const open_timer_logout = () => {
        console.log('click open timer logout')
        setMenu(false)
    }

    if (localStorage.getItem('dark_theme')) {
        return (
            <>
                {
                    menu ? <>
                        <div>
                            <div className="fixed bottom-10 right-5 bg-slate-500 z-50 p-5
                            rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50
                            hover:shadow-none" onClick={open_timer_logout}>Открыть</div>
                        </div>
                    </> : <>
                        <div>
                            <div className="fixed bottom-10 right-20 mr-32 bg-slate-500 z-50 p-5
                            rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50
                            hover:shadow-none" onClick={close_timer_logout}>Закрыть</div>
                            <div className="fixed bottom-10 right-5 bg-slate-800 z-50 rounded-xl">
                                <div onClick={logout} className="p-5 bg-red-400 m-5 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50 hover:shadow-none">Выйти</div>
                                <div className="p-5 bg-slate-400 m-5 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50 hover:shadow-none">{''+time}</div>
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }

    else {
        return (
            <div>
                <div className="fixed bottom-10 right-20 mr-32 bg-slate-500 z-50 p-5
            rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50
            hover:shadow-none" onClick={close_timer_logout}>Закрыть</div>
                <div className="fixed bottom-10 right-5 bg-slate-800 z-50 rounded-xl">
                    <div onClick={logout} className="p-5 bg-red-400 m-5 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50 hover:shadow-none">Выйти</div>
                    <div className="p-5 bg-slate-400 m-5 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50 hover:shadow-none">{''+time}</div>
                </div>
            </div>
        )
    }
}