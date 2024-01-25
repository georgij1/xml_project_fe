import { deploy_api, port_server } from "../../ServerVariable"
import { rows } from "../../objects/CreateDataTable"
import { createData } from "../../function/CreateData"
import { body } from "../../objects/BodyObjects"

export const GetFileList = (
    setFiles: any,
    setFoundFile: any,
    setIsLoadingElementMain: any
) => {
    fetch(deploy_api+port_server+`/file/list`, {
        method: 'POST',
        // @ts-ignore
        body: JSON.stringify(body),
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cache-Control': 'no-cache'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data[0].file_name !== "Not found file") {
                data.forEach((item: any) => {
                    rows.push(createData(item["id_file"], item["file_name"], item["author"], item["time_stamp"]))
                    setFoundFile(true)
                    setFiles(data)
                    setIsLoadingElementMain(false)
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })
}