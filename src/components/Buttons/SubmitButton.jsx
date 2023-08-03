import {Button} from '@mui/material'
import React from 'react'

export default function SubmitButton({disabled, onClick}) {
    return (
        <Button
            type="submit"
            disabled={disabled}
            onClick={onClick}
            sx={{backgroundColor: "#B38B00", marginTop: '25px'}}
            variant="contained"
            className='text-[18px]'
        >Submit</Button>
    )
}
