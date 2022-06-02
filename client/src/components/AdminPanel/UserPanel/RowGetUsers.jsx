import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  adminToUser,
  deleteAdmin,
  deleteUser,
  userToAdmin,
} from "../../../redux/actions";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableBody,
  Typography,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MailIcon from "@mui/icons-material/Mail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import UserEditButton from "./UserEditButton";
import AdminEditButton from "./AdminEditButton";
import Swal from "sweetalert2";


function RowGetUsers({ row, user, setRender , render }) {
  const token = JSON.parse(window.localStorage.getItem("token"))?.token;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Está seguro de eliminar este usuario?",
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      background: "#DFDCD3",
      showCancelButton: true,
      confirmButtonColor: "#B6893E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimnar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteUser({ userId: row.id, token }));
        setRender(e.target.value);
        Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
      }
    });
  };

  async function handleDeleteAdmin(e) {
    e.preventDefault();
    Swal.fire({
      title: "¿Está seguro de eliminar este administrador?",
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      background: "#DFDCD3",
      showCancelButton: true,
      confirmButtonColor: "#B6893E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimnar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteAdmin({ adminId: row.id, token }));
        setRender(e.target.value);
        Swal.fire(
          "Eliminado!",
          "El administrador ha sido eliminado.",
          "success"
        );
      }
    });
  }
  
  async function handleChangeUserToAdmin(e) {
    e.preventDefault();
    Swal.fire({
      title: "¿Está seguro de cambiar el rol de este usuario?",
      text: "El rol cambiará de usuario a administrador",
      icon: "warning",
      background: "#DFDCD3",
      showCancelButton: true,
      confirmButtonColor: "#B6893E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(userToAdmin(e.target.value,token));
        setRender(e.target.value);
        window.location.reload()
        Swal.fire(
          "Cambiado!",
          "El usuario ahora es administrador.",
          "success"
        );
      }
    });
  }
  
  async function handleChangeAdminToUser(e) {
    e.preventDefault();
    Swal.fire({
      title: "¿Está seguro de cambiar el rol de este administrador?",
      text: "El rol cambiará de administrador a usuario",
      icon: "warning",
      background: "#DFDCD3",
      showCancelButton: true,
      confirmButtonColor: "#B6893E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(adminToUser(e.target.value,token));
        setRender(e.target.value);
        window.location.reload()
        Swal.fire(
          "Cambiado!",
          "El administrador ahora es usuario.",
          "success"
        );
      }
    });
  }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ width: "5%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell sortDirection="asc">
          <Typography>{row.id}</Typography>
        </TableCell>

        <TableCell>
          <Typography>
            {row.userName}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography>{row.role === "user" ? "Usuario" : "Administrador" }</Typography>
        </TableCell>

        <TableCell sx={{ width: "10%" }}>
          {user === "admin" && row.role === "user" ? (

            <UserEditButton user={row} token={token} setRender={setRender} render={render} />
          
            ) : (
            <></>
          )}
          {user === "superAdmin" ? (
            row.role === "user" ? (

              <UserEditButton user={row} token={token} setRender={setRender} render={render} />

            ) : (
              row.role === "admin" && (
                
                <AdminEditButton user={row} token={token} setRender={setRender} render={render} />

              )
            )
          ) : (
            <></>
          )}
        </TableCell>

        <TableCell sx={{ width: "10%" }}>
          {user === "admin" && row.role === "user" ? (
            <Button
              size="small"
              value={row.id}
              onClick={(e) => handleDeleteUser(e)}
              name="delete"
            >
              Eliminar
            </Button>
          ) : (
            <></>
          )}
          {user === "superAdmin" ? (
            row.role === "user" ? (
              <Button
                size="small"
                value={row.id}
                onClick={(e) => handleDeleteUser(e)}
                name="delete"
              >
                Eliminar
              </Button>
            ) : (
              row.role === "admin" && (
                <Button
                  size="small"
                  value={row.id}
                  onClick={(e) => handleDeleteAdmin(e)}
                  name="delete"
                >
                  Eliminar
                </Button>
              )
            )
          ) : (
            <></>
          )}
        </TableCell>

        {user === "superAdmin" ? (
          row.role === "admin" ?
          <TableCell>
            <Button
              size="small"
              value={row.id}
              onClick={(e)=>handleChangeAdminToUser(e)}
              name="delete"
            >
              Cambiar rol
            </Button>
          </TableCell>
          :
          <TableCell>
            <Button
              size="small"
              value={row.id}
              onClick={(e)=>handleChangeUserToAdmin(e)}
              name="delete"
            >
              Cambiar rol
            </Button>
          </TableCell>
        ) : (
          <></>
        )}
      </TableRow>
      <TableRow sx={{ width: "100%" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table aria-label="purchases">
              <TableBody>

              <TableRow>
                  <TableCell sx={{ width: "15%" }} />
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      justifyContent: "left",
                    }}
                  >
                    <Typography variant="h6">Nombre:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Typography>{row.firstName}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "15%" }} />
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      justifyContent: "left",
                    }}
                  >
                    <Typography variant="h6">Apellido:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Typography>{row.lastName}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "15%" }} />
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      justifyContent: "left",
                    }}
                  >
                    <MailIcon />
                    <Typography variant="h6">E-mail:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Typography>{row.email}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "15%" }} />
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      textAlign: "left",
                      justifyContent: "spacer-araund",
                    }}
                  >
                    <ContactPhoneIcon />
                    <Typography variant="h6">Teléfono:</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "80%",
                    }}
                  >
                    <Typography
                      sx={{
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {row.phone}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ width: "15%" }} />
                  <TableCell
                    sx={{
                      width: "20%",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="h6">Usuario desde:</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "80%" }}>
                    <Typography>{row.createdAt.slice(0, 10)}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowGetUsers;
