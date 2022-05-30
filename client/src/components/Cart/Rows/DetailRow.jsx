import {
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clearCart,
  deleteFromCart,
} from "../../../redux/actions";
import ModalToRow from "./ModalToRow";
import Swal from "sweetalert2";

const DetailRow = (props) => {
  const dispatch = useDispatch();
  const { row, cartId, token, setRender, render } = props;
  const [cantidad, setCantidad] = useState(row.Quantity.total);

  const total = row.price * row.Quantity.total;
  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#DFDCD3",
      showCancelButton: true,
      confirmButtonColor: "#B6893E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFromCart(row.id, cartId));
        dispatch(clearCart())
        setRender(!render);
        Swal.fire({
          title: "Borrado",
          text: "Producto borrado del carrito",
          icon: "success",
          confirmButtonColor: "#B6893E",
          background: "#DFDCD3",
        });
      }
    });
  };

  return (
    <TableRow>
      <TableCell>
        <Typography>{row.name}</Typography>
      </TableCell>
      <TableCell sx={{display:'flex', alignItems:"center", mb:-0.06}}>

          <Typography>{row.Quantity.total}</Typography>

        <ModalToRow
          cantidad={cantidad}
          setCantidad={setCantidad}
          token={token}
          id={row.id}
          stock={row.productInventory.quantity}
          setRender={setRender}
          render={render}
          precio={row.price}
        />
      </TableCell>
      <TableCell>
        <Typography>{row.price}</Typography>
      </TableCell>
      <TableCell width='20%'>
        <Typography>{total}</Typography>
      </TableCell>
        <IconButton
          aria-label="delete"
          size="small"

          onClick={(e) => {
            handleDelete(e);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
    </TableRow>
  );
};

export default DetailRow;
