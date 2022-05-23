import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell align='center'>{row.subCategories.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.subCategories?.map((sc) => (
                    <TableRow key={sc.name}>
                      <TableCell align='left' sx={{width:'5%'}}>
                      <HorizontalRuleIcon/> 
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{mr:2}}>
                        {sc.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}






const GetAllCategoriesToAdmin = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Box sx={{mt:5, width:'90%'}}>
      <TableContainer component={Paper} >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>Nombre</TableCell>
              <TableCell align='center'>Cantidad de subcategorias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            allCategories?.map((c)=>{
            return <Row row={c}/>
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GetAllCategoriesToAdmin;
