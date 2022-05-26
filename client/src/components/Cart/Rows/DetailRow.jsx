import { IconButton, Table, TableCell, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteFromCart, getCartForChild } from "../../../redux/actions";

const DetailRow = (props) => {
  const dispatch = useDispatch()
  const { row, cartId } = props;
  const cart = useSelector((state) => state.cart);

  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(1);


  useEffect(() => {
    setPrecio(row.price);
  }, []);

  const total = precio * cantidad;
  const handleSetCantidad = (e) => {
    setCantidad(e.target.value)
  }
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteFromCart(row.id, cartId))
    dispatch(getCartForChild(cartId))
  }


  return (
    <TableRow>
      <TableCell>
        <Typography>{row.name}</Typography>
      </TableCell>
      <TableCell />
      <TableCell>
        <TextField
          margin="normal"
          type="number"
          id="cantidad"
          label={cantidad}
          name="cantidad"
          sx={{
              width: 100
          }}
          onChange={(e)=>{ handleSetCantidad(e)}}
        />
      </TableCell>
      <TableCell>
        <Typography>{row.price}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{total}</Typography>
      </TableCell>
      <TableCell>
        <IconButton aria-label="delete" size="small" onClick={(e)=>{ handleDelete(e)}} >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DetailRow;
