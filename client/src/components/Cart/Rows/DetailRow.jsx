import { IconButton, Table, TableCell, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemToCart, deleteFromCart, getCartForChild } from "../../../redux/actions";
import ModalToRow from "./ModalToRow";
import Swal from 'sweetalert2';


const DetailRow = (props) => {
  const dispatch = useDispatch()
  const { row, cartId, token } = props;
  const [cantidad, setCantidad] = useState(row.Quantity.total)
  const [precio, setPrecio] = useState(row.price);



  const total = precio * row.Quantity.total;
  const handleDelete = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      background: '#DFDCD3',
      showCancelButton: true,
      confirmButtonColor: '#B6893E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFromCart(row.id, cartId))
        dispatch(getCartForChild(cartId))
        dispatch(getCartForChild(cartId))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <TableRow>
      <TableCell sx={{width:'40%'}}>
        <Typography>{row.name}</Typography>
      </TableCell>
      <TableCell sx={{width:'15%'}}>
        <Typography>{row.Quantity.total}</Typography>
        <ModalToRow cantidad={cantidad} setCantidad={setCantidad} token={token} id={row.id}/>
      </TableCell>
      <TableCell sx={{width:'20%'}}>
        <Typography>{row.price}</Typography>
      </TableCell>
      <TableCell sx={{width:'20%'}}>
      <Typography>{total}</Typography>
      </TableCell>
      <TableCell sx={{width:'5%'}}> 
        <IconButton aria-label="delete" size="small" onClick={(e)=>{ handleDelete(e)}} >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DetailRow;
