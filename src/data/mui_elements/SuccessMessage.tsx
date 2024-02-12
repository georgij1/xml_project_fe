import React from "react";
import { send_update_data_server } from "../objects/send_update_data_server"
import Button from '@mui/material/Button';
import { useSnackbar, VariantType } from 'notistack';
import { EditScreen } from "../mui_elements/EditScreen";

interface PropsSuccessMessage {
    data: any;
    ComponentTableName: any;
    ComponentTableName_1: any;
    setComponentTableName: any;
    click_card_data: any;
    arr_count_columns_xml: any;
    setComponentTableName_1: any;
    arr_count_head_xml: any;
    contentFile: any;
    open: any;
}

export const SuccessMessage = (
    {
        data,
        ComponentTableName,
        ComponentTableName_1,
        setComponentTableName,
        click_card_data,
        arr_count_columns_xml,
        setComponentTableName_1,
        arr_count_head_xml,
        contentFile,
        open
    }: PropsSuccessMessage
) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant: VariantType) => () => {
        enqueueSnackbar(data, { variant });
        send_update_data_server()
    };

    return (
        <React.Fragment>
            <EditScreen 
                ComponentTableName={ComponentTableName}
                ComponentTableName_1={ComponentTableName_1}
                setComponentTableName={setComponentTableName}
                click_card_data={click_card_data}
                arr_count_columns_xml={arr_count_columns_xml}
                setComponentTableName_1={setComponentTableName_1}
                arr_count_head_xml={arr_count_head_xml}
                contentFile={contentFile}
                open={open}
            />
            <Button onClick={
                handleClickVariant('success')
            } variant="contained" color="success">Сохранить</Button>
        </React.Fragment>
    );
}