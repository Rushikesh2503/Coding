import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
    boxShadow: 24,
  textAlign: 'center',
  p: 4,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [form, setFormData] = useState({});
    
    useEffect(() => {
        postData()
    }, [form])
  
    const postData = async () => {
        const { data } = await axios.post(`http://localhost:3100/students`, form);
        // console.log('data:', data)
    };

    const handleChange = (e) => {
        // console.log(e.target.value)
    setGender(e.target.value);
    };
    const handleChangen = (e) => {
        // console.log(e.target.value)
    setName(e.target.value);
    };
    const handleChangea = (e) => {
        // console.log(e.target.value)
    setAge(e.target.value);
    };
    const handleChangec = (e) => {
        // console.log(e.target.value)
    setCity(e.target.value);
    };
    const handleSubmit = (event) => {
        setFormData({ name: name, age: age, city: city, gender: gender });
        handleClose()
   };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>ADD STUDENT</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField label="Name" color="secondary" focused  value={name}
        onChange={handleChangen} />
          <div><br/></div>
          <TextField label="Age" color="secondary" focused value={age}
        onChange={handleChangea} />
          <div><br/></div>
          <TextField label="City" color="secondary" focused value={city}
        onChange={handleChangec}/>
          <div><br/></div>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
        </FormControl>
        <br />
        <br />
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}