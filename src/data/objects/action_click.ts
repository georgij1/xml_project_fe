export const action_click = (
    action: any,
    setCoppy: any
) => {
    if (action.name === "Печать") {
        let printwin = window.open("");
        if (printwin) {
            let elements = document.getElementsByClassName("textWord");
            if (elements.length > 0) {
                for (let element of Array.from(elements)) {
                    const text = element.textContent;
                    if (text !== null) {
                        printwin.document.write(text);
                    }
                }

                printwin.stop();
                printwin.print();
                printwin.close();
            }
        }
    }

    else if (action.name === "Скопировать") {
        let elements = document.getElementsByClassName("textWord");
        let text = Array.from(elements).map(element => element.textContent).join(" ");
        navigator.clipboard.writeText(text);
        setCoppy(true)
    }
}