import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import * as yup from "yup";
import { editUser, getAllUsers, postRegisterUser } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { NavButton } from "../../../personalizadTheme";

const validationSchema = yup.object({
  userName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),

  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),

  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Lastname is required"),

  phone: yup
    .string()
    .max(10, "Too Long!")
    .required("Phone number is required"),

});

function UserEditButton({user , token , setRender, render}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const [errorValidate, setErrorValidate] = useState(null);

  const formik = useFormik({
    initialValues: {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
        console.log("ESTOY EN EL SUBMIT", values)
        handleClose()
    Swal.fire({
      title: `¿Está seguro de modificar a ${user.userName}?`,
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      background: "#DFDCD3",
      showCancelButton: true,
      confirmButtonColor: "#B6893E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, modificar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(editUser({ userId: user.id , token , payload: values}));
        setRender(!render);
        Swal.fire("Modificado!", "El usuario ha sido modificado exitosamente.", "success");
      }
    })
  }
   
  });

  return (
    <div>
      <NavButton size="small" variant="outlined" onClick={handleOpen}>Editar</NavButton>
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
          <Typography component="h1" variant="h5">
            Editar Usuario
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            
            <TextField
              margin="normal"
            /*   required */
              fullWidth
              id="userName"
              label="Nombre de usuario"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />

            <TextField
              margin="normal"
           /*    required */
              fullWidth
              id="firstName"
              label="Nombre"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <TextField
              margin="normal"
              /* required */
              fullWidth
              id="lastName"
              label="Apellido"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            <TextField
              margin="normal"
         /*      required */
              fullWidth
              id="phone"
              label="Teléfono"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            <Button
              type="submit"
              fullWidth
              color="ambar3"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formik.dirty}
            >
              Modificar usuario
            </Button>

            {<Button
              onClick={handleClose}
              fullWidth
              color="ambar3"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancelar
            </Button>}
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default UserEditButton;
