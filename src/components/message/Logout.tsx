import "./Logout.css"
import {useState} from "react";

export const Logout = () => {
    const [time, setTime] = useState('')

    const choose_time='22:00:00'

    // @ts-ignore
    const interval = (countDown) => {
        const x = setInterval(() => {
            const now = new Date().getTime()
            const distance = countDown-now
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTime(`${hours+"h "+minutes + "m "+seconds+"s "}`)
            if (distance < 0) {
                clearInterval(x);
                setTime('Время вышло')
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

    const logout = () => {
        console.log('logout company')
    }

    return(
        <div className="message">
            <h1 onClick={logout}>Выйти</h1>
            <h1>{''+time}</h1>
        </div>
    )
}