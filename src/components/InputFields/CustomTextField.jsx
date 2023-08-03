import {TextField} from '@mui/material'
import React from 'react'

export default function CustomTextField({className, id, name, onChange, required, type = "text", label, placeholder, value}) {
    return (
        <TextField
            className={className}
            sx={{marginTop: '15px'}}
            onChange={onChange}
            name={name}
            value={value}
            label={label}
            type={type}
            variant="standard"
            required={required}/>
    )
}
