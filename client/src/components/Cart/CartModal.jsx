import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, getCartById } from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CartModal({
  id,
  description,
  token,
  cartProducts,
  userStatus,
  name,
  stock,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // setPrecio();
  }, []);
  const handleSetCantidad = (e) => {
    setCantidad(e.target.value);
  };

  const handleSubmitCart = (e) => {
    e.preventDefault();
    let busqueda = cartProducts?.find((p) => p.id === id);
    if(cantidad <= stock){
      if (!busqueda) {
        dispatch(addItemToCart(id, token, cantidad));
        dispatch(getCartById(token));
        Swal.fire({
          background: "#DFDCD3",
          icon: "success",
          title: "Agregado",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpen(false);
      } else {
        Swal.fire({
          background: "#DFDCD3",
          confirmButtonColor: "#B6893E",
          icon: "error",
          title: "Oops...",
          text: "Ya tenes este producto en tu carrito",
          footer: "<a href='/cart'> Ir al carrito </a>",
          confirmButtonText: "Seguir viendo",
        });
        setOpen(false);
      }
    } else {
      if(stock === 0){
        Swal.fire({
          background: "#DFDCD3",
          confirmButtonColor: "#B6893E",
          icon: "error",
          title: "Oops...",
          text: "Este producto esta agotado",
        });
        setOpen(false);
      } else {
        setOpen(false);
        Swal.fire({
          background: "#DFDCD3",
          confirmButtonColor: "#B6893E",
          icon: "error",
          title: "Oops...",
          text: "Stock insuficiente para la cantidad que seleccionaste",
        }).then(()=>{
          setOpen(true)
        });
        
      }
    }
  };
  const handleAlert = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Logeate',
      text: "Debes estar logeado para ver tu carrito",
      icon: 'warning',
      background: '#DFDCD3',
      showCancelButton: true,
      confirmButtonColor: '#B6893E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok, ir al login',
      cancelButtonText: 'cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login')
      }
    })
  }

  return (
    <div>
      <Button onClick={ userStatus !== null ? handleOpen : handleAlert}>Agregar al Carrito</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant='h6'>
            {name}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <form
            onSubmit={(e) => {
              handleSubmitCart(e);
            }}
          >
          <Typography>
            stock: {stock}
          </Typography>
            <TextField
              margin="normal"
              type="number"
              required
              id="cantidad"
              label={cantidad}
              value={cantidad}
              name="cantidad"
              sx={{
                width: 100,
              }}
              onChange={(e) => {
                handleSetCantidad(e);
              }}
            ></TextField>

            <Button type="submit"> Agregar </Button>
            <Button onClick={() => setOpen(false)}> Cancelar </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
