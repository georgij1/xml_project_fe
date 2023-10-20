import "./Logout.css"
import {useState} from "react";

export const Logout = () => {
    const [time, setTime] = useState('')
    const [menu, setMenu] = useState<boolean>(false)
    const choose_time=localStorage.getItem('MessageLogout')
    const interval = (countDown : any) => {
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
        if (new Date().getMonth()+1===1) interval(new Date("January"+new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===2) interval(new Date("February"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===3) interval(new Date("March"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===4) interval(new Date("April"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===5) interval(new Date("May"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===6) interval(new Date("June"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===7) interval(new Date("July"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===8) interval(new Date("August"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===9) interval(new Date("September"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===10) interval(new Date("October"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===11) interval(new Date("November"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
        else if (new Date().getMonth()+1===11) interval(new Date("December"+ new Date().getDate()+", "+new Date().getFullYear()+" "+choose_time).getTime())
    }

    count_call()

    const logout = () => window.open(`/logout`, '_self')

    const close_timer_logout = () => {
        setMenu(true)
        localStorage.setItem('menu', String(true))
    }

    const open_timer_logout = () => {
        setMenu(false)
        localStorage.setItem('menu', String(false))
    }

    if (localStorage.getItem('theme')) {
        return (
            <>
                {
                    menu || localStorage.getItem('menu') === String(true) ? <>
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
            <>
                {
                    menu || localStorage.getItem('menu') === String(true) ? <>
                        <div>
                            <div className="fixed bottom-10 right-5 bg-slate-500 z-50 p-5
                            rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50
                            hover:shadow-none text-white" onClick={open_timer_logout}>Открыть</div>
                        </div>
                    </> : <>
                        <div>
                            <div className="fixed bottom-10 right-20 mr-32 bg-slate-500 z-50 p-5
                            rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50
                            hover:shadow-none text-white" onClick={close_timer_logout}>Закрыть</div>
                            <div className="fixed bottom-10 right-5 bg-slate-800 z-50 rounded-xl text-white">
                                <div onClick={logout} className=" text-white p-5 bg-red-400 m-5 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50 hover:shadow-none">Выйти</div>
                                <div className=" text-white p-5 bg-slate-400 m-5 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/50 hover:shadow-none">{''+time}</div>
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}