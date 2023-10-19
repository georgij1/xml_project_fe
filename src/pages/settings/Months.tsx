export const Months = () => {
    let Month = ""

    const define_month = () => {
        const style = 'border-cyan-500/50 border-solid border-2 shadow-lg cursor-no-drop p-2 rounded'
        Month=style
    }

    define_month()

    return (
        <div className="grid gap-5 items-center m-1 gap-x-10">
            <div className={""+Month}>Январь</div>
        </div>
    )
}