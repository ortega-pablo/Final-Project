import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventary, getProducts, putQuantity } from "../../../redux/actions";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

export const AdmininAllStock = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    quantity: yup
      .number("El stock es numerico")
      .typeError("El stock deber ser numerico")
      .required(
        "El stock es requerido si es que lo deseas agregar.Luego tambien lo podrás modificar en cualquier momento"
      )
      .max(100000, "100000 es el valor maximo")
      .positive("El stock debe ser positivo"),
  });
  const formik = useFormik({
    initialValues: {
      quantity: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      Swal.fire({
        background: '#DFDCD3',
        icon: 'success',
        title: 'Exito',
        showConfirmButton: false,
        timer: 1500
      })
      await dispatch(putQuantity(idProd, values));
      await dispatch(getProducts());
      await dispatch(getInventary());
      resetForm({ values: "" });
    },
  });

  const allStock = useSelector((state) => state.inventory);
  const allProducts = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getInventary());
    dispatch(getProducts());
  }, [dispatch]);
  const [updating, setUpdating] = useState(false);
  const [idProd, setIdProd] = useState(0);

  const productToUpdate = allProducts?.find((p) => p.id == idProd);

  async function handleUpdateStock(e) {
    e.preventDefault();
    setUpdating(true);
    setIdProd(e.target.value);
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Nombre del producto: </b>
              </TableCell>
              <TableCell>
                <b>Stock: </b>
              </TableCell>
              <TableCell>
                <b>Precio por unidad: </b>
              </TableCell>
              <TableCell>
                <b>Valor en stock: </b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allProducts.map((p) => {
              return (
                <TableRow>
                  <TableCell>{p?.name}</TableCell>
                  <TableCell>{p?.productInventory?.quantity}</TableCell>
                  <TableCell> ${p?.price}</TableCell>
                  <TableCell>
                    ${p?.price * p?.productInventory?.quantity}
                  </TableCell>

                  <Button
                    value={p.id}
                    onClick={(e) => handleUpdateStock(e)}
                    // name="delete"
                    // startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {updating && (
        <>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            sx={{display: 'flex', alignItems:'center', m:3}}
          >
          <Typography sx={{m:3}}>
            Estas editando a: <b>{productToUpdate.name}</b>
          </Typography>
            <TextField
              id="outlined-basic"
              label="Stock"
              variant="outlined"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
              sx={{m:3}}
            />
            <Typography sx={{m:3}}>
              Stock actual: {productToUpdate?.productInventory?.quantity}{" "}
            </Typography>
            <Button type="submit" variant='contained' sx={{mr:1}} color="ambar3">Editar stock</Button>
            <Button type="submit" variant='contained' color="ambar3" onClick={(e) => setUpdating(false)}>
              Cancelar edición
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
