import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const Input = ({ value, onChange }) => {
    return (
        <TextField
            sx={{
                maxWidth: '600px'
            }}        
            id="outlined-basic"
            fullWidth
            label={"Character name " + value}
            variant="outlined"
            onChange={onChange}
            value={value} />
    )
}

export default Input;