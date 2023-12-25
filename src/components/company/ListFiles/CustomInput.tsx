import * as React from 'react';
import { useInput } from '@mui/base/useInput';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { styled } from '@mui/system';
import { CustomInputProps } from '../../../data/interface/CustomInputProps';
import { blue } from '../../../data/objects/Color/BlueColor';
import { grey } from '@mui/material/colors';

const StyledInputElement = styled('input')(
    ({ theme }) => `
        width: 100%;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 4px ${
        theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
        &:hover {
            border-color: ${blue[400]};
        }
  
        &:focus {
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
        outline: 0;
        }
    `,
);

export const CustomInput = React.forwardRef(function CustomInput(
    props: CustomInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const { getRootProps, getInputProps } = useInput(props)
    const inputProps = getInputProps();
    inputProps.ref = useForkRef(inputProps.ref, ref);
    return (
        <div {...getRootProps()}>
            <StyledInputElement {...props} {...inputProps} />
        </div>
    );
});