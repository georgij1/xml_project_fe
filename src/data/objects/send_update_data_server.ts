import { formData } from "../objects/AllVariables";

export const send_update_data_server = () => {
    console.log('get data')
    let main_doc:any = document.querySelector('main')
    if (main_doc !== null) {
        let Textarea:any = main_doc.querySelector('textarea')
        let h4:any = main_doc.querySelector('h4')
        let h4Content:any = h4.textContent
        formData.append('h4', h4Content)
        let TextareaContent:any = Textarea.textContent
        formData.append('Textarea', TextareaContent)
        console.log(formData.get("Textarea"))
        console.log(formData.get("h4"))
        console.log(formData)
    }
}