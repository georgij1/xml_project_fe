import Button from '@mui/material/Button';
import { useSnackbar, VariantType } from 'notistack';
import React from 'react';

export const ErrorMessage = (props: any) => {
    console.log(props)
    const { data } = props
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant: VariantType) => () => {
        enqueueSnackbar(data, { variant });
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickVariant('error')} variant="outlined" color="error">Сохранить</Button>
        </React.Fragment>
    );
}