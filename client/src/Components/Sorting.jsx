import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios"

export default function BasicSelect({setData2}) {
    const [gender, setGender] = React.useState();
    
    React.useEffect(() => {
        console.log('gender:', gender)
        getData(1)
    }, [gender])
    
    const getData = async (page) => {
      const { data } = await axios.get(
       `http://localhost:3100/students/${gender}?page=${page}&limit=10`
     );
    setData2(data.students);
  };

  const handleChange = (e) => {
      setGender(e.target.value);
  };

  return (
    <Box sx={{ maxWidth: 200 , background: 'white'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort on Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Sort on Gender"
          onChange={handleChange}
        >
          <MenuItem >BOTH</MenuItem>
          <MenuItem value="male">MALE</MenuItem>
          <MenuItem value="female">FEMALE</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
