import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import Editstud from "./Editstud";
import BasicSelect from "./Sorting";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};

const rows = ["Rahul", "Abhi", "MAhesh"];

export default function CustomizedTables() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(1);
  const [len, setLen] = useState(0);
  const [data2, setData2] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    getData(page);
  }, [page]);

  const handleDelete = (e) => {
    axios.delete(`http://localhost:3100/students/${e._id}`)
    getData(page)
  }
    const handleView = (e) => {
    handleOpen()
    setName(e.name)
    setCity(e.city)
    setGender(e.gender)
    setAge(e.age)
  };
  const getData = async (page) => {
    const { data } = await axios.get(
      `http://localhost:3100/students?page=${page}&limit=10`
    );
    setData2(data.students);
    console.log("e:", data.students);
  };
  const handleChange = (event, value) => {
    // console.log('value:', value)
    setPage(value);
  };
  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
      
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Students Name</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">
                <BasicSelect setData2={setData2}/>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data2.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={()=>handleView(row)}>VIEW</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <h2>Name of The Student: {name}</h2>
                    <h3>Age: {age}</h3>
                    <h3>Gender: <span style={{textTransform: "uppercase"}}>{gender}</span> </h3>
                    <h3>City: {city}</h3>
                  </Box>
                </Modal>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Editstud data={row} getData={getData}/>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={()=>handleDelete(row)} >DELETE</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <div style={{width: '30%', margin: '5px auto' }}>
        <Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
        </div>
      </div>
  );
}
